'use client';

import { useEffect } from 'react';

// Lista de imagens críticas para pré-carregar
const CRITICAL_IMAGES = [
  '/fundo.jpeg',
  '/carrinho.png',
  // Adicione aqui os caminhos para as imagens mais importantes do seu site
  // Exemplo: '/images/hero-banner.jpg',
];

export function ImagePreloader() {
  useEffect(() => {
    // Função para pré-carregar uma única imagem
    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    // Pré-carrega todas as imagens críticas
    const preloadImages = async () => {
      try {
        await Promise.all(CRITICAL_IMAGES.map(src => preloadImage(src)));
        console.log('Imagens críticas pré-carregadas com sucesso!');
      } catch (error) {
        console.error('Erro ao pré-carregar imagens:', error);
      }
    };

    // Inicia o pré-carregamento
    preloadImages();

    // Pré-carrega imagens quando a conexão estiver ociosa
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages);
    } else {
      // Fallback para navegadores que não suportam requestIdleCallback
      setTimeout(preloadImages, 0);
    }

    // Adiciona links de preload no cabeçalho do documento
    const addPreloadLinks = () => {
      const head = document.getElementsByTagName('head')[0];
      
      CRITICAL_IMAGES.forEach(src => {
        // Verifica se o link de preload já existe
        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = src;
          link.as = 'image';
          head.appendChild(link);
        }
      });
    };

    // Adiciona os links de preload
    addPreloadLinks();

    // Limpa os event listeners quando o componente for desmontado
    return () => {
      // Limpeza opcional, se necessário
    };
  }, []);

  return null; // Este componente não renderiza nada na tela
}
