const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

// Configurações
const SOURCE_DIR = path.join(__dirname, '..', 'public', 'images', 'personalizar');
const TARGET_DIR = path.join(__dirname, '..', 'public', 'images', 'personalizar-optimized');
const MAX_WIDTH = 1200;
const QUALITY = 80;
const FORMAT = 'webp';

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calcular novas dimensões mantendo a proporção
    const width = Math.min(metadata.width, MAX_WIDTH);
    const height = Math.round((width / metadata.width) * metadata.height);

    await image
      .resize(width, height, { fit: 'inside' })
      .toFormat(FORMAT, { quality: QUALITY })
      .toFile(outputPath);

    const stats = await fs.stat(outputPath);
    const originalSize = (await fs.stat(inputPath)).size;
    const saved = ((originalSize - stats.size) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${saved}% menor)`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao processar ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory() {
  try {
    // Encontrar todas as imagens
    const imagePaths = await glob('**/*.{jpg,jpeg,png,webp}', { 
      cwd: SOURCE_DIR,
      nodir: true,
      absolute: true,
      ignore: '**/node_modules/**'
    });

    console.log(`🔍 Encontradas ${imagePaths.length} imagens para otimizar`);
    
    let success = 0;
    let skipped = 0;
    
    for (const imagePath of imagePaths) {
      const relativePath = path.relative(SOURCE_DIR, imagePath);
      const outputPath = path.join(TARGET_DIR, relativePath);
      const outputDir = path.dirname(outputPath);
      
      // Criar diretório de destino se não existir
      await ensureDir(outputDir);
      
      // Manter a mesma extensão ou converter para webp
      const ext = path.extname(imagePath).toLowerCase();
      const outputFile = path.basename(imagePath, ext) + (ext === '.webp' ? '.webp' : '.webp');
      const finalOutputPath = path.join(outputDir, outputFile);
      
      // Verificar se já existe uma versão otimizada
      try {
        await fs.access(finalOutputPath);
        console.log(`⏩ Pulando ${relativePath} (já existe)`);
        skipped++;
        continue;
      } catch {
        // Arquivo não existe, continuar com a otimização
      }
      
      const result = await optimizeImage(imagePath, finalOutputPath);
      if (result) success++;
    }
    
    console.log(`\n✅ Processo concluído!`);
    console.log(`📊 Resultados:`);
    console.log(`   - ${success} imagens otimizadas`);
    console.log(`   - ${skipped} imagens já existentes`);
    console.log(`   - ${imagePaths.length - success - skipped} falhas`);
    console.log(`\nAs imagens otimizadas foram salvas em: ${TARGET_DIR}`);
    
  } catch (error) {
    console.error('❌ Erro ao processar diretório:', error);
    process.exit(1);
  }
}

// Executar o processo
processDirectory();
