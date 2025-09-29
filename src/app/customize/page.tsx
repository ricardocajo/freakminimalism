'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

type Subcategory = {
  name: string;
  path: string;
  image?: string;
};

// Format raw color labels from filenames into pretty labels (Title Case, spaces, basic accents)
const prettyColorLabel = (raw: string) => {
  // normalize underscores/hyphens to spaces
  let s = raw.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  // handle common lowercase underscores coming from file parsing
  // title case basic words, keep small words lowercase
  const small = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);
  s = s
    .split(' ')
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i > 0 && small.has(lw)) return lw;
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(' ');
  // minimal accent fixes for Portuguese terms commonly found
  s = s
    .replace(/Medio/gi, 'Médio')
    .replace(/Vermelho/gi, 'Vermelho')
    .replace(/Verde/gi, 'Verde')
    .replace(/Preto/gi, 'Preto')
    .replace(/Cinza/gi, 'Cinza')
    .replace(/Floresta/gi, 'Floresta')
    .replace(/Marinho/gi, 'Marinho');
  return s;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

// Map color/file codes to human-readable names. Extend this as needed.
// Example: "00.png" -> code "00" -> "White/Branco"
const COLOR_CODE_MAP: Record<string, string> = {
  '00': 'Branco',
  '11': 'Preto Escuro',
  '1L': 'Azul Claro / Light Blue',
  '24': 'Vermelho / Red',
  '2C': 'Amarelo Solar',
  '32': 'Laranja',
  '33': 'Verde Escuro / Dark Green',
  '37': 'Castanho',
  '3E': 'Verde Garrafa / Bottle Green',
  '42': 'Verde',
  '44': 'Verde Escuro',
  '48': 'Laranja / Orange',
  '4F': 'Verde Orquidia',
  '4K': 'Bege / Beige',
  '4L': 'Castanho Urbano',
  '52': 'Vermelho',
  '54': 'Bordeaux',
  '55': 'Magenta / Magenta',
  '5J': 'Coral / Coral',
  '5N': 'Roxo Radiante',
  '5P': 'Pêssego / Peach',
  '5R': 'Cereja / Cherry',
  '62': 'Azul Milenio',
  '63': 'Cinza Escuro / Dark Gray',
  '64': 'Cinza Claro / Light Gray',
  '6D': 'Carvão / Charcoal',
  '6K': 'Grafite / Graphite',
  '6M': 'Antracite / Anthracite',
  '6N': 'Prata / Silver',
  '6P': 'Chumbo / Lead',
  '6T': 'Petróleo / Teal',
  '6W': 'Azul Petróleo / Petrol Blue',
  '6X': 'Azul Escuro / Dark Blue',
  '6Y': 'Azul Noite / Midnight Blue',
  '80': 'Verde Lima / Lime',
  '81': 'Bege',
  '92': 'Cinzento Claro',
  '93': 'Cinzento Escuro',
  '96': 'Preto Claro',
  'B5': 'Vermelho e Branco',
  'B6': 'Azul e Branco',
};

const categories: Category[] = [
  {
    name: 'Patches',
    subcategories: []
  },
  {
    name: 'King',
    subcategories: [
      { name: 'T-Shirt', path: '/personalizar/KING/T-SHIRT', image: '/images/personalizar/KING/T-SHIRT/150/Luanda_Black_Front.jpg' },
      { name: 'Hood', path: '/personalizar/KING/HOOD', image: '/images/personalizar/KING/HOOD/00.png' },
      { name: 'Sweat', path: '/personalizar/KING/SWEAT', image: '/images/personalizar/KING/SWEAT/00.png' },
      { name: 'Polo', path: '/personalizar/KING/POLO', image: '/images/personalizar/KING/POLO/00.png' },
      { name: 'Manga Comprida', path: '/personalizar/KING/M.COMPRIDA' },
      { name: 'Zipp', path: '/personalizar/KING/ZIPP', image: '/images/personalizar/KING/ZIPP/95.png' },
      { name: 'Cavas', path: '/personalizar/KING/CAVAS', image: '/images/personalizar/KING/CAVAS/00.png' },
    ]
  },
  {
    name: 'Queen',
    subcategories: [
      { name: 'T-Shirt', path: '/personalizar/QUEEN/T-SHIRT', image: '/images/personalizar/QUEEN/T-SHIRT/150/Luanda_Black_Front.jpg' },
      { name: 'Hood', path: '/personalizar/QUEEN/HOOD', image: '/images/personalizar/QUEEN/HOOD/00.png' },
      { name: 'Sweat', path: '/personalizar/QUEEN/SWEAT', image: '/images/personalizar/QUEEN/SWEAT/00.png' },
      { name: 'Polo', path: '/personalizar/QUEEN/POLO', image: '/images/personalizar/QUEEN/POLO/00.png' },
      { name: 'Manga Comprida', path: '/personalizar/QUEEN/MANGA CUMPRIDA', image: '/images/personalizar/QUEEN/MANGA CUMPRIDA/Bucharest Women/Bucharest Women/Bucharest Women_Black_Front.jpg' },
      { name: 'Zipp', path: '/personalizar/QUEEN/ZIPP', image: '/images/personalizar/QUEEN/ZIPP/95.png' },
      { name: 'Polar Gama Women', path: '/personalizar/QUEEN/POLAR', image: '/images/personalizar/QUEEN/POLAR GAMA WOMEN/300/preto_f.jpg' },
    ]
  },
  {
    name: 'Kid',
    subcategories: [
      { name: 'T-Shirt', path: '/personalizar/KID/T-SHIRT', image: '/images/personalizar/KID/T-SHIRT/Ankara Kids_Black_Front.jpg' },
      { name: 'Calças', path: '/personalizar/KID/CALCAS', image: '/images/personalizar/KID/CALCAS/preto_f.jpg' },
      { name: 'Polos', path: '/personalizar/KID/POLOS', image: '/images/personalizar/KID/POLOS/Adam kids_Black_Front.jpg' },
      { name: 'Hooded Kids', path: '/personalizar/KID/HOODEDKIDS', image: '/images/personalizar/KID/HOODEDKIDS/bc560103.jpg' },
      { name: 'Sweat', path: '/personalizar/KID/SWEAT', image: '/images/personalizar/KID/SWEAT/11.png' },
      { name: 'Snapback', path: '/personalizar/KID/SNAPBACK', image: '/images/personalizar/KID/SNAPBACK/11.png' },
      { name: 'Zipp Kids', path: '/personalizar/KID/ZIPPKIDS', image: '/images/personalizar/KID/ZIPPKIDS/11.png' },
      { name: 'Fraser', path: '/personalizar/KID/FRASER', image: '/images/personalizar/KID/FRASER/11.png' },
      { name: 'Panama', path: '/personalizar/KID/PANAMA', image: '/images/personalizar/KID/PANAMA/11.png' },
    ]
  },
  {
    name: 'Unisex',
    subcategories: [
      { name: 'Cavas', path: '/personalizar/UNISEX/CAVAS' },
      { name: 'Oversize', path: '/personalizar/UNISEX/OVERSIZE', image: '/images/personalizar/UNISEX/OVERSIZE/fjord_preto_f.jpg' },
      { name: 'Sweat Scarda', path: '/personalizar/UNISEX/SWEAT SCARDA' },
    ]
  }
];

export default function CustomizePage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  const handleCategorySelect = (index: number) => {
    const isSame = selectedCategory === index;
    if (isSame) {
      // Collapse if clicking the same category
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      return;
    }
    // Select category and auto-select its first subcategory (if any)
    setSelectedCategory(index);
    const first = categories[index]?.subcategories?.[0] ?? null;
    setSelectedSubcategory(first || null);
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    // Here you would typically load the products for this subcategory
    // For now, we'll just log the selection
    console.log('Selected subcategory:', subcategory);
  };

  const [customMessage, setCustomMessage] = useState('');
  const [patchDimensions, setPatchDimensions] = useState({ width: '', height: '' });
  const [patchQuantity, setPatchQuantity] = useState('');

  // Holds image filenames available for the selected product (e.g., ["00.png", "1A.png"]) 
  const [productImages, setProductImages] = useState<string[]>([]);
  // Which mode the current images correspond to: density/gama/simple
  const [imageMode, setImageMode] = useState<'density'|'gama'|'simple'>('simple');
  // Folder prefix to prepend when rendering images (e.g., '150/' or 'GAMA WOMEN/' or '')
  const [imageFolderPrefix, setImageFolderPrefix] = useState<string>('');
  // Naming mode for parsing filenames
  const [imageNameMode, setImageNameMode] = useState<'brand_color_view'|'polar_gw'>('brand_color_view');

  // Convenience: currently selected category/model names from the subcategory path
  const [currentCatModel, setCurrentCatModel] = useState<{ cat: string; model: string } | null>(null);

  // Currently selected image filename (e.g., "00.png").
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Density selection for T-SHIRT (KING/QUEEN) models, e.g., '150' | '190'
  const [density, setDensity] = useState<string | null>(null);
  // For T-SHIRT in density mode: selected color and view
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<'Front' | 'Side' | 'Back'>('Front');
  // Embroidery position selector
  const [embroideryPosition, setEmbroideryPosition] = useState<'Frente' | 'Trás'>('Frente');

  // Parse filename like "Luanda_Apple Green_Front.jpg" or "Ankara_Alperce_F.jpg"
  // → { brand, color, view }
  const parseTeeName = (name: string) => {
    // Accept any brand prefix (e.g., Luanda, Ankara, Game Woman, etc.) before first underscore
    const m = name.match(/^([^_]+)_(.+)_(Front|Side|Back|F|L|C)\.[^.]+$/i);
    if (!m) return null as null | { brand: string; color: string; view: 'Front'|'Side'|'Back' };
    const raw = m[3].toLowerCase();
    const view = raw === 'f' ? 'Front' : raw === 'l' ? 'Side' : raw === 'c' ? 'Back' : (m[3] as 'Front'|'Side'|'Back');
    return { brand: m[1], color: m[2], view };
  };

  // Parse filename like "preto_f.jpg" (POLAR GAMA WOMEN set) → { color: 'preto', view: 'Front'|'Side'|'Back' }
  const parsePolarGWName = (name: string) => {
    const m = name.match(/^([a-zA-Z_]+)_(f|l|c)\.[^.]+$/);
    if (!m) return null as null | { color: string; view: 'Front'|'Side'|'Back' };
    const view = m[2] === 'f' ? 'Front' : m[2] === 'l' ? 'Side' : 'Back';
    const color = m[1].replace(/_/g, ' ');
    return { color, view };
  };

  const isModelWithDensity = (cat?: string, model?: string) => (model === 'T-SHIRT' || model === 'POLO') && (cat === 'KING' || cat === 'QUEEN');
  const isQueenPolarWithGama = (cat?: string, model?: string) => cat === 'QUEEN' && model === 'POLAR';
  // View navigation helpers
  const viewOrder: ('Front'|'Side'|'Back')[] = ['Front', 'Side', 'Back'];
  const goPrevView = () => {
    setSelectedView((prev) => {
      const idx = viewOrder.indexOf(prev);
      return viewOrder[(idx + viewOrder.length - 1) % viewOrder.length];
    });
  };
  const goNextView = () => {
    setSelectedView((prev) => {
      const idx = viewOrder.indexOf(prev);
      return viewOrder[(idx + 1) % viewOrder.length];
    });
  };

  useEffect(() => {
    if (!selectedSubcategory) {
      setProductImages([]);
      setImageMode('simple');
      setImageFolderPrefix('');
      setCurrentCatModel(null);
      setDensity(null);
      setSelectedColor(null);
      setSelectedView('Front');
      return;
    }
    // path format: /personalizar/<CATEGORY>/<MODEL>
    const parts = selectedSubcategory.path.split('/').filter(Boolean);
    // Expecting ["personalizar", "CAT", "MODEL"]
    if (parts.length >= 3) {
      const cat = parts[1];
      const model = parts[2];
      setCurrentCatModel({ cat, model });

      const fetchImages = async () => {
        try {
          const isTShirtWithDensity = isModelWithDensity(cat, model);
          // Initialize default density if applicable
          let effectiveDensity = density;
          if (isTShirtWithDensity && !effectiveDensity) {
            // Default per model: T-SHIRT -> 150, POLO -> 240
            const def = model === 'POLO' ? '240' : '150';
            effectiveDensity = def;
            setDensity(def);
          }

          const baseUrl = `/api/personalizar/images?category=${encodeURIComponent(cat)}&model=${encodeURIComponent(model)}`;
          const densityUrl = isTShirtWithDensity && effectiveDensity ? `${baseUrl}&density=${encodeURIComponent(effectiveDensity)}` : '';
          const gamaUrl = isQueenPolarWithGama(cat, model) ? `${baseUrl}&gama=${encodeURIComponent('GAMA WOMEN')}` : '';
          // Alternate layout you have on disk: model folder is "POLAR GAMA WOMEN" with density 300
          const altModel = (cat === 'QUEEN' && model === 'POLAR') ? 'POLAR GAMA WOMEN' : model;
          const altBaseUrl = `/api/personalizar/images?category=${encodeURIComponent(cat)}&model=${encodeURIComponent(altModel)}`;
          const altDensityUrl = (altModel !== model) ? `${altBaseUrl}&density=300` : '';

          let imgs: string[] = [];
          // Try density first when applicable
          if (densityUrl) {
            const res = await fetch(densityUrl);
            if (!res.ok) throw new Error('Failed to load images');
            const data = await res.json();
            imgs = Array.isArray(data.images) ? data.images : [];
            if (imgs.length > 0) {
              setImageMode('density');
              setImageFolderPrefix(`${effectiveDensity}/`);
            }
          }
          // If no density images and this is QUEEN/POLAR, try gama folder under POLAR
          if (imgs.length === 0 && gamaUrl) {
            const resG = await fetch(gamaUrl);
            if (!resG.ok) throw new Error('Failed to load images');
            const dataG = await resG.json();
            const gamaImgs: string[] = Array.isArray(dataG.images) ? dataG.images : [];
            if (gamaImgs.length > 0) {
              imgs = gamaImgs;
              setImageMode('gama');
              setImageFolderPrefix('GAMA WOMEN/');
              setImageNameMode('brand_color_view');
            }
          }
          // If still empty and alternate model exists, try its density folder 300
          if (imgs.length === 0 && altDensityUrl) {
            const resAlt = await fetch(altDensityUrl);
            if (!resAlt.ok) throw new Error('Failed to load images');
            const dataAlt = await resAlt.json();
            const altImgs: string[] = Array.isArray(dataAlt.images) ? dataAlt.images : [];
            if (altImgs.length > 0) {
              imgs = altImgs;
              setImageMode('gama');
              setImageFolderPrefix('300/');
              setImageNameMode('polar_gw');
            }
          }
          // If still empty, try alternate model base folder without density (folder structure: POLAR GAMA WOMEN/*.jpg)
          if (imgs.length === 0 && altModel !== model) {
            const resAltBase = await fetch(altBaseUrl);
            if (!resAltBase.ok) throw new Error('Failed to load images');
            const dataAltBase = await resAltBase.json();
            const altBaseImgs: string[] = Array.isArray(dataAltBase.images) ? dataAltBase.images : [];
            if (altBaseImgs.length > 0) {
              imgs = altBaseImgs;
              setImageMode('gama');
              setImageFolderPrefix('');
              setImageNameMode('polar_gw');
            }
          }
          // Fallback to base folder
          if (imgs.length === 0) {
            const resB = await fetch(baseUrl);
            if (!resB.ok) throw new Error('Failed to load images');
            const dataB = await resB.json();
            imgs = Array.isArray(dataB.images) ? dataB.images : [];
            // If the folder uses short view suffixes (e.g., preto_f.jpg), switch to polar_gw parsing
            const hasPolarGW = imgs.some((n: string) => /^([a-zA-Z_]+)_(f|l|c)\.[^.]+$/.test(n));
            // If the folder uses brand/color/view like "Ankara Kids_Black_Front.jpg", enable brand_color_view with arrows
            const hasBrandColorView = imgs.some((n: string) => /^([^_]+)_(.+)_(Front|Side|Back)\.[^.]+$/i.test(n));
            if (hasPolarGW) {
              setImageMode('gama');
              setImageFolderPrefix('');
              setImageNameMode('polar_gw');
            } else if (hasBrandColorView) {
              setImageMode('gama');
              setImageFolderPrefix('');
              setImageNameMode('brand_color_view');
            } else {
              setImageMode('simple');
              setImageFolderPrefix('');
              setImageNameMode('brand_color_view');
            }
          }
          setProductImages(imgs);
          if (imageMode === 'density' || isTShirtWithDensity) {
            // choose first valid Front image, set color and image
            const valid = imgs.map(parseTeeName).filter(Boolean) as {brand:string;color:string;view:'Front'|'Side'|'Back'}[];
            const first = valid.find(v => v.view === 'Front') || valid[0];
            if (first) {
              setSelectedColor(first.color);
              // find filename for that selection
              const fname = imgs.find(n => {
                const p = parseTeeName(n);
                return p && p.color === first.color && p.view === 'Front';
              }) || null;
              setSelectedImage(fname);
              setSelectedView('Front');
            } else {
              setSelectedColor(null);
              setSelectedImage(null);
              setSelectedView('Front');
            }
          } else if (imageMode === 'gama' || isQueenPolarWithGama(cat, model)) {
            // For QUEEN/POLAR with GAMA WOMEN, group by color; prefer Front if available
            const items = imageNameMode === 'polar_gw'
              ? imgs.map(parsePolarGWName).filter(Boolean) as {color:string;view:'Front'|'Side'|'Back'}[]
              : imgs.map(parseTeeName).filter(Boolean) as {brand?:string;color:string;view:'Front'|'Side'|'Back'}[];
            const first = items.find(v => v.view === 'Front') || items[0];
            if (first) {
              setSelectedColor(first.color);
              const fname = imgs.find(n => {
                const p = imageNameMode === 'polar_gw' ? parsePolarGWName(n) : parseTeeName(n);
                return p && p.color === first.color && (p.view === 'Front' || p.view === first.view);
              }) || null;
              setSelectedImage(fname);
              setSelectedView(first.view);
            } else {
              setSelectedColor(null);
              setSelectedImage(imgs.length > 0 ? imgs[0] : null);
              setSelectedView('Front');
            }
          } else {
            const first = imgs.length > 0 ? imgs[0] : null;
            setSelectedImage(first);
            if (first) {
              const base = first.replace(/\.[^.]+$/, '');
              const code = base.toUpperCase();
              const label = COLOR_CODE_MAP[code] || base;
              setSelectedColor(label);
            } else {
              setSelectedColor(null);
            }
          }
        } catch (err) {
          setProductImages([]);
          setSelectedImage(null);
          setSelectedColor(null);
        }
      };

      fetchImages();
    } else {
      setProductImages([]);
      setCurrentCatModel(null);
      setSelectedImage(null);
      setDensity(null);
      setSelectedColor(null);
      setSelectedView('Front');
    }
  }, [selectedSubcategory, density]);

  // Keep selectedImage in sync for density/gama modes when color/view changes
  useEffect(() => {
    if (!currentCatModel) return;
    if (!(imageMode === 'density' || imageMode === 'gama')) return;
    const imgs = productImages;
    if (!imgs || imgs.length === 0 || !selectedColor) return;
    // find exact match; if missing current view, fallback order Front→Side→Back
    const order: ('Front'|'Side'|'Back')[] = [selectedView, 'Front', 'Side', 'Back'];
    let chosen: string | null = null;
    for (const v of order) {
      const match = imgs.find(n => {
        const p = imageNameMode === 'polar_gw' ? parsePolarGWName(n) : parseTeeName(n);
        return p && p.color === selectedColor && p.view === v;
      });
      if (match) { chosen = match; break; }
    }
    setSelectedImage(chosen);
  }, [selectedColor, selectedView, productImages, currentCatModel]);
  const [patchNotes, setPatchNotes] = useState('');

  const handleWhatsAppOrder = () => {
    if (selectedCategory === null) return;
    
    let message = '';
    
    if (categories[selectedCategory].name === 'Pedido Especial') {
      // For special orders, use the custom message
      message = `Olá, gostaria de fazer um pedido especial:\n\n${customMessage}`;
    } else if (categories[selectedCategory].name === 'Patches') {
      // For Patches category
      message = `*NOVO PEDIDO DE PATCHES*\n\n` +
               `📏 *Dimensões:* ${patchDimensions.width || '--'} x ${patchDimensions.height || '--'} mm\n` +
               `🔢 *Quantidade:* ${patchQuantity || '--'}\n` +
               `📝 *Notas adicionais:* ${patchNotes || 'Nenhuma'}\n\n` +
               `🖼️ *ENVIE A FOTO DO SEU DESIGN*\n` +
               `Por favor, envie a imagem ou referência do seu design como uma mensagem separada logo após enviar este formulário.\n\n` +
               `ℹ️ Certifique-se que a imagem está nítida e mostra claramente o que deseja personalizar.`;
    } else if (selectedSubcategory) {
      // For other categories with subcategories
      // Determine density label from state or folder prefix
      const folderDensity = (() => {
        if (!density && imageFolderPrefix) {
          const m = imageFolderPrefix.match(/^(\d+)\//);
          return m ? m[1] : null;
        }
        return null;
      })();
      const dens = (density || folderDensity)
        ? (density || folderDensity) === '150'
          ? '150 g/m² — Luanda'
          : (density || folderDensity) === '190'
            ? '190 g/m² — Ankara'
            : (density || folderDensity) === '300'
              ? (currentCatModel && currentCatModel.model === 'T-SHIRT' && currentCatModel.cat === 'QUEEN'
                  ? '300 g/m² — Game Woman'
                  : '300 g/m²')
              : `${density || folderDensity} g/m²`
        : null;
      const cor = selectedColor ? selectedColor : (selectedImage ? selectedImage.replace(/\.[^.]+$/, '') : null);
      // Determine if this is QUEEN/POLAR to show Gama info
      const isQueenPolar = (() => {
        const parts = selectedSubcategory.path.split('/').filter(Boolean);
        return parts.length >= 3 && parts[1] === 'QUEEN' && parts[2] === 'POLAR';
      })();
      message = `Olá, gostaria de encomendar um item personalizado:\n\n` +
               `Categoria: ${categories[selectedCategory].name}\n` +
               `Modelo: ${selectedSubcategory.name}\n` +
               `${isQueenPolar ? `Gama: GAMA WOMEN\n` : ''}` +
               `${dens ? `Densidade: ${dens}\n` : ''}` +
               `${cor ? `Cor/Imagem: ${prettyColorLabel(cor)}\n` : ''}` +
               `Posição do bordado: ${embroideryPosition}\n\n` +
               `Por favor, envie mais informações sobre como proceder com a personalização.`;
    } else {
      return;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=351960361839&text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Personalização</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Categorias</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={category.name} className="border-b border-gray-200">
                  <button
                    onClick={() => handleCategorySelect(index)}
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
                      selectedCategory === index ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                  
                  {selectedCategory === index && category.subcategories.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1 py-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.path}
                          onClick={() => handleSubcategorySelect(subcategory)}
                          className={`block w-full text-left py-1 px-4 text-sm rounded-md transition-colors ${
                            selectedSubcategory?.path === subcategory.path
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {selectedCategory !== null && categories[selectedCategory].name === 'Patches' ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Encomenda de Patches</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Largura (mm) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={patchDimensions.width}
                      onChange={(e) => setPatchDimensions(prev => ({ ...prev, width: e.target.value }))}
                      className="w-full border-2 border-gray-300 rounded-md p-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="Ex: 100"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Máx: 500mm</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Altura (mm) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={patchDimensions.height}
                      onChange={(e) => setPatchDimensions(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full border-2 border-gray-300 rounded-md p-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="Ex: 100"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Máx: 500mm</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={patchQuantity}
                    onChange={(e) => setPatchQuantity(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-md p-3 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="Ex: 10"
                    required
                  />
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-bold">Atenção:</span> Após enviar este formulário, você será direcionado para o WhatsApp. Por favor, envie uma foto ou imagem de referência do seu design como uma mensagem separada.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detalhes do Design
                    <span className="text-xs font-normal text-gray-500 block">Descreva as cores, materiais e detalhes do seu design</span>
                  </label>
                  <textarea 
                    value={patchNotes}
                    onChange={(e) => setPatchNotes(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-md p-3 min-h-[100px] text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="Ex: Fundo preto com letras brancas, borda dourada, tecido de algodão..."
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Como enviar seu design</h3>
                      <div className="mt-1 text-sm text-blue-700">
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Clique no botão abaixo para abrir o WhatsApp</li>
                          <li>O aplicativo irá abrir com uma mensagem pré-preenchida</li>
                          <li>Envie uma foto do seu design como resposta a esta mensagem</li>
                          <li>Certifique-se que a imagem está nítida e mostra todos os detalhes</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  disabled={!patchDimensions.width || !patchDimensions.height || !patchQuantity}
                  className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 ${
                    patchDimensions.width && patchDimensions.height && patchQuantity
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.498 14.382l-1.106-1.624-1.715-.415c-.603-.146-1.15.25-1.55.65l-1.23 1.23c-1.36-1.36-3.67-3.66-3.67-3.67l1.23-1.23c.4-.4.796-1.05.65-1.55l-.415-1.715-1.624-1.106c-.9-.6-2.2-.4-2.9.4l-1.23 1.23c-.3.3-.5.7-.5 1.15 0 .1 0 .25.05.35 1.1 3.54 3.77 6.21 7.31 7.31.1.05.25.05.35.05.45 0 .85-.2 1.15-.5l1.23-1.23c.7-.7 1-1.95.4-2.9z"/>
                    <path d="M17.5 6.5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/>
                  </svg>
                  <span>Enviar Pedido e Anexar Design</span>
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  Você será redirecionado para o WhatsApp para completar seu pedido
                </p>
              </div>
            </div>
          ) : selectedCategory !== null && categories[selectedCategory].name === 'Pedido Especial' ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Pedido Especial</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descreva o seu pedido especial com todos os detalhes:
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-md p-4 min-h-[200px] text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="Por favor, descreva o que precisa com o máximo de detalhes possível, incluindo cores, tamanhos, materiais, etc..."
                  />
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={!customMessage.trim()}
                  className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 ${
                    customMessage.trim()
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Enviar Pedido Especial por WhatsApp</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.498 14.382l-1.106-1.624-1.715-.415c-.603-.146-1.15.25-1.55.65l-1.23 1.23c-1.36-1.36-3.67-3.66-3.67-3.67l1.23-1.23c.4-.4.796-1.05.65-1.55l-.415-1.715-1.624-1.106c-.9-.6-2.2-.4-2.9.4l-1.23 1.23c-.3.3-.5.7-.5 1.15 0 .1 0 .25.05.35 1.1 3.54 3.77 6.21 7.31 7.31.1.05.25.05.35.05.45 0 .85-.2 1.15-.5l1.23-1.23c.7-.7 1-1.95.4-2.9z"/>
                    <path d="M17.5 6.5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : selectedSubcategory ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                    {currentCatModel && selectedImage ? (
                      <Image
                        src={`/images/personalizar/${currentCatModel.cat}/${currentCatModel.model}/${imageFolderPrefix}${selectedImage}`}
                        alt={`${selectedSubcategory.name} - ${categories[selectedCategory!].name}`}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                        priority
                      />
                    ) : (
                      <span className="text-gray-400">Imagem do produto</span>
                    )}
                    {currentCatModel && (imageMode === 'density' || imageMode === 'gama') && selectedImage && (
                      <>
                        <button
                          type="button"
                          onClick={goPrevView}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                          aria-label="Anterior"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                        </button>
                        <button
                          type="button"
                          onClick={goNextView}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                          aria-label="Seguinte"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                        </button>
                      </>
                    )}
                  </div>
                  {currentCatModel && (imageMode === 'density' || imageMode === 'gama') && selectedImage && (
                    <div className="mt-2 text-xs text-gray-600">
                      Vista: {selectedView === 'Front' ? 'Frente' : selectedView === 'Side' ? 'Lado' : 'Costas'}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">
                    {categories[selectedCategory!].name} - {selectedSubcategory.name}
                  </h2>
                  
                  <div className="space-y-6 mt-8">
                    {/* Thumbnails removed per request; using dropdown selector below */}
                    <div>
                      <h3 className="font-medium mb-2">Opções de Personalização</h3>
                      <div className="space-y-4">
                        {currentCatModel && (currentCatModel.model === 'T-SHIRT' || currentCatModel.model === 'POLO') && (currentCatModel.cat === 'KING' || currentCatModel.cat === 'QUEEN') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Densidade
                            </label>
                            <select
                              className="w-full border border-gray-300 rounded-md p-2"
                              value={density ?? '150'}
                              onChange={(e) => setDensity(e.target.value)}
                            >
                              {currentCatModel.model === 'T-SHIRT' && (
                                <>
                                  <option value="150">150 g/m² — Luanda</option>
                                  <option value="190">190 g/m² — Ankara</option>
                                  {currentCatModel.cat === 'QUEEN' && (
                                    <option value="300">300 g/m² — Game Woman</option>
                                  )}
                                </>
                              )}
                              {currentCatModel.model === 'POLO' && (
                                <>
                                  <option value="240">240 g/m²</option>
                                </>
                              )}
                            </select>
                          </div>
                        )}
                        {(currentCatModel && (imageMode === 'density' || imageMode === 'gama')) ? (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                            <select
                              className="w-full border border-gray-300 rounded-md p-2"
                              value={selectedColor ?? ''}
                              onChange={(e) => setSelectedColor(e.target.value)}
                              disabled={productImages.length === 0}
                            >
                              <option value="" disabled>
                                {productImages.length > 0 ? 'Selecione uma cor' : 'Sem cores disponíveis'}
                              </option>
                              {Array.from(new Set(productImages
                                .map((n) => imageNameMode === 'polar_gw' ? parsePolarGWName(n) : parseTeeName(n))
                                .filter(Boolean)
                                .map((p) => (p as {color:string}).color)
                              )).map((color) => (
                                <option key={color as string} value={color as string}>{color as string}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                            <select
                              className="w-full border border-gray-300 rounded-md p-2"
                              value={selectedImage ?? ''}
                              onChange={(e) => setSelectedImage(e.target.value)}
                              disabled={productImages.length === 0}
                            >
                              <option value="" disabled>
                                {productImages.length > 0 ? 'Selecione uma cor' : 'Sem cores disponíveis'}
                              </option>
                              {productImages.map((img) => {
                                const code = img.replace(/\.[^.]+$/, '');
                                const label = COLOR_CODE_MAP[code] || code;
                                return (
                                  <option key={img} value={img}>
                                    {label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tamanho
                          </label>
                          <select className="w-full border border-gray-300 rounded-md p-2">
                            <option>Selecione um tamanho</option>
                            <option>Pequeno (S)</option>
                            <option>Médio (M)</option>
                            <option>Grande (L)</option>
                            <option>Extra Grande (XL)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Posição do Bordado
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={embroideryPosition}
                            onChange={(e) => setEmbroideryPosition(e.target.value as 'Frente' | 'Trás')}
                          >
                            <option value="Frente">Frente</option>
                            <option value="Trás">Trás</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Detalhes da Personalização
                          </label>
                          <textarea 
                            className="w-full border-2 border-gray-300 rounded-md p-3 min-h-[100px] text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                            placeholder="Descreva como deseja personalizar o seu item..."
                          />
                        </div>
                        {/* Info boxes similar to Patches flow */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                <span className="font-bold">Atenção:</span> Após enviar este pedido, você será direcionado para o WhatsApp. Por favor, envie uma foto ou imagem de referência do seu design como uma mensagem separada.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-blue-800">Como enviar seu design</h3>
                              <div className="mt-1 text-sm text-blue-700">
                                <ol className="list-decimal pl-4 space-y-1">
                                  <li>Clique no botão abaixo para abrir o WhatsApp</li>
                                  <li>O aplicativo irá abrir com uma mensagem pré-preenchida</li>
                                  <li>Envie uma foto do seu design como resposta a esta mensagem</li>
                                  <li>Certifique-se que a imagem está nítida e mostra todos os detalhes</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Enviar Pedido por WhatsApp</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.498 14.382l-1.106-1.624-1.715-.415c-.603-.146-1.15.25-1.55.65l-1.23 1.23c-1.36-1.36-3.67-3.66-3.67-3.67l1.23-1.23c.4-.4.796-1.05.65-1.55l-.415-1.715-1.624-1.106c-.9-.6-2.2-.4-2.9.4l-1.23 1.23c-.3.3-.5.7-.5 1.15 0 .1 0 .25.05.35 1.1 3.54 3.77 6.21 7.31 7.31.1.05.25.05.35.05.45 0 .85-.2 1.15-.5l1.23-1.23c.7-.7 1-1.95.4-2.9z"/>
                        <path d="M17.5 6.5c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma categoria selecionada</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Selecione uma categoria no menu à esquerda para ver os modelos disponíveis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
