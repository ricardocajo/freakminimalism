"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AlertTriangle, ChevronLeft, ChevronRight, Info, MessageCircle } from "lucide-react";
import {
  CATEGORIES,
  COLOR_CODE_MAP,
  Subcategory,
  VIEW_LABEL_PT,
  VIEW_ORDER,
  View,
  WHATSAPP_PHONE,
  isModelWithDensity,
  isQueenPolarWithGama,
  parsePolarGWName,
  parseTeeName,
  prettyColorLabel,
} from "./data";

type ImageMode = "density" | "gama" | "simple";
type NameMode = "brand_color_view" | "polar_gw";

// Small helpers -----------------------------------------------------------

const NoticeBox = ({
  tone,
  title,
  children,
}: {
  tone: "warning" | "info";
  title?: string;
  children: React.ReactNode;
}) => {
  const styles =
    tone === "warning"
      ? { wrap: "border-l-4 border-[#f0b429] bg-[#241f12]", text: "text-[#f7d37a]", Icon: AlertTriangle }
      : { wrap: "border border-[#1d3a56] bg-[#0f1e2e]", text: "text-[#8ec5ff]", Icon: Info };
  const Icon = styles.Icon;
  return (
    <div className={`flex gap-3 p-4 rounded-md ${styles.wrap}`}>
      <Icon className={`h-5 w-5 shrink-0 ${styles.text}`} strokeWidth={1.75} />
      <div className={`text-sm ${styles.text}`}>
        {title ? <h3 className="font-semibold mb-1 text-white/90">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
};

const WhatsAppButton = ({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 transition-colors ${
      disabled
        ? "bg-[#1a1a1a] text-[#555] cursor-not-allowed border border-[#2a2a2a]"
        : "bg-[#128C7E] hover:bg-[#0f6f63] text-white"
    }`}
  >
    <MessageCircle className="w-5 h-5" strokeWidth={2} />
    <span>{label}</span>
  </button>
);

// Main page ---------------------------------------------------------------

export default function CustomizePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  const [customMessage, setCustomMessage] = useState("");
  const [patchDimensions, setPatchDimensions] = useState({ width: "", height: "" });
  const [patchQuantity, setPatchQuantity] = useState("");
  const [patchNotes, setPatchNotes] = useState("");

  const [productImages, setProductImages] = useState<string[]>([]);
  const [imageMode, setImageMode] = useState<ImageMode>("simple");
  const [imageFolderPrefix, setImageFolderPrefix] = useState<string>("");
  const [imageNameMode, setImageNameMode] = useState<NameMode>("brand_color_view");

  const [currentCatModel, setCurrentCatModel] = useState<{ cat: string; model: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [density, setDensity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<View>("Front");
  const [embroideryPosition, setEmbroideryPosition] = useState<"Frente" | "Trás">("Frente");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [customizationDetails, setCustomizationDetails] = useState<string>("");

  const isChapeus =
    selectedCategory !== null && CATEGORIES[selectedCategory]?.name === "Chapéus";

  const handleCategorySelect = (index: number) => {
    if (selectedCategory === index) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      return;
    }
    setSelectedCategory(index);
    setSelectedSubcategory(CATEGORIES[index]?.subcategories[0] ?? null);
  };

  const goPrevView = () =>
    setSelectedView((prev) => {
      const idx = VIEW_ORDER.indexOf(prev);
      return VIEW_ORDER[(idx + VIEW_ORDER.length - 1) % VIEW_ORDER.length];
    });
  const goNextView = () =>
    setSelectedView((prev) => {
      const idx = VIEW_ORDER.indexOf(prev);
      return VIEW_ORDER[(idx + 1) % VIEW_ORDER.length];
    });

  // Reset per-product fields when the user picks a different subcategory.
  useEffect(() => {
    setSelectedSize("");
    setCustomizationDetails("");
    setEmbroideryPosition("Frente");
  }, [selectedSubcategory]);

  // Fetch image set for the current subcategory/density -------------------
  useEffect(() => {
    if (!selectedSubcategory) {
      setProductImages([]);
      setImageMode("simple");
      setImageFolderPrefix("");
      setCurrentCatModel(null);
      setDensity(null);
      setSelectedColor(null);
      setSelectedView("Front");
      return;
    }

    const parts = selectedSubcategory.path.split("/").filter(Boolean);
    if (parts.length < 3) {
      setProductImages([]);
      setCurrentCatModel(null);
      setSelectedImage(null);
      setDensity(null);
      setSelectedColor(null);
      setSelectedView("Front");
      return;
    }

    const cat = parts[1];
    const model = parts[2];
    setCurrentCatModel({ cat, model });

    const controller = new AbortController();
    let cancelled = false;

    const buildUrl = (overrides: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams({ category: cat, model });
      for (const [key, value] of Object.entries(overrides)) {
        if (value) params.set(key, value);
      }
      return `/api/personalizar/images?${params.toString()}`;
    };

    const fetchJson = async (url: string) => {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) return [] as string[];
      const data = await res.json().catch(() => ({}));
      return Array.isArray(data.images) ? (data.images as string[]) : [];
    };

    const fetchImages = async () => {
      try {
        const isTShirtWithDensity = isModelWithDensity(cat, model);
        let effectiveDensity = density;
        if (isTShirtWithDensity && !effectiveDensity) {
          effectiveDensity = model === "POLO" ? "240" : "150";
          setDensity(effectiveDensity);
        }

        let imgs: string[] = [];
        let localMode: ImageMode = "simple";
        let localNameMode: NameMode = "brand_color_view";
        let localPrefix = "";

        if (isTShirtWithDensity && effectiveDensity) {
          imgs = await fetchJson(buildUrl({ density: effectiveDensity }));
          if (imgs.length > 0) {
            localMode = "density";
            localPrefix = `${effectiveDensity}/`;
          }
        }

        if (imgs.length === 0 && isQueenPolarWithGama(cat, model)) {
          const gama = await fetchJson(buildUrl({ gama: "GAMA WOMEN" }));
          if (gama.length > 0) {
            imgs = gama;
            localMode = "gama";
            localPrefix = "GAMA WOMEN/";
          }
        }

        // Alternate layout for QUEEN/POLAR: model is "POLAR GAMA WOMEN", density 300.
        const altModel = cat === "QUEEN" && model === "POLAR" ? "POLAR GAMA WOMEN" : model;
        if (imgs.length === 0 && altModel !== model) {
          const altDensity = await fetchJson(
            `/api/personalizar/images?${new URLSearchParams({
              category: cat,
              model: altModel,
              density: "300",
            }).toString()}`,
          );
          if (altDensity.length > 0) {
            imgs = altDensity;
            localMode = "gama";
            localNameMode = "polar_gw";
            localPrefix = "300/";
          } else {
            const altBase = await fetchJson(
              `/api/personalizar/images?${new URLSearchParams({
                category: cat,
                model: altModel,
              }).toString()}`,
            );
            if (altBase.length > 0) {
              imgs = altBase;
              localMode = "gama";
              localNameMode = "polar_gw";
              localPrefix = "";
            }
          }
        }

        if (imgs.length === 0) {
          imgs = await fetchJson(buildUrl({}));
          if (imgs.some((n) => /^([a-zA-Z_]+)_(f|l|c)\.[^.]+$/.test(n))) {
            localMode = "gama";
            localNameMode = "polar_gw";
          } else if (imgs.some((n) => /^([^_]+)_(.+)_(Front|Side|Back)\.[^.]+$/i.test(n))) {
            localMode = "gama";
          }
        }

        if (cancelled) return;

        setProductImages(imgs);
        setImageMode(localMode);
        setImageFolderPrefix(localPrefix);
        setImageNameMode(localNameMode);

        if (localMode === "density") {
          const valid = imgs.map(parseTeeName).filter(Boolean) as NonNullable<ReturnType<typeof parseTeeName>>[];
          const first = valid.find((v) => v.view === "Front") || valid[0];
          if (first) {
            setSelectedColor(first.color);
            const fname = imgs.find((n) => {
              const p = parseTeeName(n);
              return p && p.color === first.color && p.view === "Front";
            }) || null;
            setSelectedImage(fname);
            setSelectedView("Front");
          } else {
            setSelectedColor(null);
            setSelectedImage(null);
            setSelectedView("Front");
          }
        } else if (localMode === "gama") {
          const items =
            localNameMode === "polar_gw"
              ? (imgs.map(parsePolarGWName).filter(Boolean) as NonNullable<ReturnType<typeof parsePolarGWName>>[])
              : (imgs.map(parseTeeName).filter(Boolean) as NonNullable<ReturnType<typeof parseTeeName>>[]);
          const first = items.find((v) => v.view === "Front") || items[0];
          if (first) {
            setSelectedColor(first.color);
            const fname =
              imgs.find((n) => {
                const p = localNameMode === "polar_gw" ? parsePolarGWName(n) : parseTeeName(n);
                return p && p.color === first.color && (p.view === "Front" || p.view === first.view);
              }) || null;
            setSelectedImage(fname);
            setSelectedView(first.view);
          } else {
            setSelectedColor(null);
            setSelectedImage(imgs[0] ?? null);
            setSelectedView("Front");
          }
        } else {
          const first = imgs[0] ?? null;
          setSelectedImage(first);
          if (first) {
            const code = first.replace(/\.[^.]+$/, "").toUpperCase();
            setSelectedColor(COLOR_CODE_MAP[code] || first.replace(/\.[^.]+$/, ""));
          } else {
            setSelectedColor(null);
          }
        }
      } catch (err) {
        if (cancelled) return;
        if ((err as { name?: string })?.name === "AbortError") return;
        setProductImages([]);
        setSelectedImage(null);
        setSelectedColor(null);
      }
    };

    fetchImages();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [selectedSubcategory, density]);

  // Keep selectedImage in sync when color/view changes in density/gama modes.
  useEffect(() => {
    if (!currentCatModel) return;
    if (imageMode !== "density" && imageMode !== "gama") return;
    if (productImages.length === 0 || !selectedColor) return;

    const order: View[] = [selectedView, "Front", "Side", "Back"];
    let chosen: string | null = null;
    for (const v of order) {
      const match = productImages.find((n) => {
        const p = imageNameMode === "polar_gw" ? parsePolarGWName(n) : parseTeeName(n);
        return p && p.color === selectedColor && p.view === v;
      });
      if (match) {
        chosen = match;
        break;
      }
    }
    setSelectedImage(chosen);
  }, [selectedColor, selectedView, productImages, currentCatModel, imageMode, imageNameMode]);

  // Keyboard navigation for views (when a density/gama image is visible).
  const imageViewerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (imageMode !== "density" && imageMode !== "gama") return;
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") goPrevView();
      if (e.key === "ArrowRight") goNextView();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [imageMode, selectedImage]);

  const availableColors = useMemo(() => {
    const parser = imageNameMode === "polar_gw" ? parsePolarGWName : parseTeeName;
    const colors = productImages
      .map(parser)
      .filter((p): p is NonNullable<ReturnType<typeof parser>> => Boolean(p))
      .map((p) => p.color);
    return Array.from(new Set(colors));
  }, [productImages, imageNameMode]);

  const handleWhatsAppOrder = () => {
    if (selectedCategory === null) return;
    const categoryName = CATEGORIES[selectedCategory].name;
    let message = "";

    if (categoryName === "Pedido Especial") {
      message = `Olá, gostaria de fazer um pedido especial:\n\n${customMessage}`;
    } else if (categoryName === "Patches") {
      message =
        `*NOVO PEDIDO DE PATCHES*\n\n` +
        `📏 *Dimensões:* ${patchDimensions.width || "--"} x ${patchDimensions.height || "--"} mm\n` +
        `🔢 *Quantidade:* ${patchQuantity || "--"}\n` +
        `📝 *Notas adicionais:* ${patchNotes || "Nenhuma"}\n\n` +
        `🖼️ *ENVIE A FOTO DO SEU DESIGN*\n` +
        `Por favor, envie a imagem ou referência do seu design como uma mensagem separada logo após enviar este formulário.\n\n` +
        `ℹ️ Certifique-se que a imagem está nítida e mostra claramente o que deseja personalizar.`;
    } else if (selectedSubcategory) {
      const folderDensity = !density && imageFolderPrefix.match(/^(\d+)\//)?.[1];
      const effective = density || folderDensity || null;
      const dens = effective
        ? effective === "150"
          ? "150 g/m² — Luanda"
          : effective === "190"
            ? "190 g/m² — Ankara"
            : effective === "300"
              ? currentCatModel?.model === "T-SHIRT" && currentCatModel.cat === "QUEEN"
                ? "300 g/m² — Game Woman"
                : "300 g/m²"
              : `${effective} g/m²`
        : null;
      const cor = selectedColor
        ? selectedColor
        : selectedImage
          ? selectedImage.replace(/\.[^.]+$/, "")
          : null;
      const isQueenPolar =
        selectedSubcategory.path.split("/").filter(Boolean)[1] === "QUEEN" &&
        selectedSubcategory.path.split("/").filter(Boolean)[2] === "POLAR";

      const sizeLine = isChapeus ? "Tamanho único" : selectedSize;
      const trimmedDetails = customizationDetails.trim();

      message =
        `Olá, gostaria de encomendar um item personalizado:\n\n` +
        `Categoria: ${categoryName}\n` +
        `Modelo: ${selectedSubcategory.name}\n` +
        (isQueenPolar ? `Gama: GAMA WOMEN\n` : "") +
        (dens ? `Densidade: ${dens}\n` : "") +
        (cor ? `Cor/Imagem: ${prettyColorLabel(cor)}\n` : "") +
        (sizeLine ? `Tamanho: ${sizeLine}\n` : "") +
        `Posição do bordado: ${embroideryPosition}\n` +
        (trimmedDetails ? `\nDetalhes da personalização:\n${trimmedDetails}\n` : "") +
        `\nPor favor, envie mais informações sobre como proceder com a personalização.`;
    } else {
      return;
    }

    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // Render helpers --------------------------------------------------------

  const card = "bg-background-secondary border border-border-primary rounded-lg shadow-md";
  const inputBase =
    "w-full bg-[#0a0a0a] border border-border-primary rounded-md p-3 text-sm text-[#EDEDED] placeholder:text-[#666] focus:border-[#4fbbd6] focus:outline-none focus:ring-1 focus:ring-[#4fbbd6] transition-colors";
  const selectBase =
    "w-full bg-[#0a0a0a] border border-border-primary rounded-md p-2 text-sm text-[#EDEDED] focus:border-[#4fbbd6] focus:outline-none focus:ring-1 focus:ring-[#4fbbd6] transition-colors";
  const labelBase = "block text-sm font-medium text-[#D4D4D4] mb-1";

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Personalização</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className={`${card} p-4`}>
            <h2 className="text-xl font-semibold mb-4">Categorias</h2>
            <div className="space-y-1">
              {CATEGORIES.map((category, index) => {
                const isActive = selectedCategory === index;
                return (
                  <div key={category.name} className="border-b border-border-primary last:border-b-0">
                    <button
                      onClick={() => handleCategorySelect(index)}
                      aria-expanded={isActive}
                      className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
                        isActive ? "bg-[#1a1a1a] font-semibold text-white" : "hover:bg-[#141414] text-[#D4D4D4]"
                      }`}
                    >
                      {category.name}
                    </button>
                    {isActive && category.subcategories.length > 0 && (
                      <div className="ml-3 mt-1 space-y-0.5 pb-2">
                        {category.subcategories.map((subcategory) => {
                          const isSubActive = selectedSubcategory?.path === subcategory.path;
                          return (
                            <button
                              key={subcategory.path}
                              onClick={() => setSelectedSubcategory(subcategory)}
                              className={`block w-full text-left py-1.5 px-3 text-sm rounded-md transition-colors ${
                                isSubActive
                                  ? "bg-[#0f2a3c] text-[#6fc8e4] font-medium"
                                  : "text-[#A1A1A1] hover:bg-[#141414] hover:text-white"
                              }`}
                            >
                              {subcategory.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {selectedCategory !== null && CATEGORIES[selectedCategory].name === "Patches" ? (
            <div className={`${card} p-6`}>
              <h2 className="text-2xl font-bold mb-6">Encomenda de Patches</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>
                      Largura (mm) <span className="text-[#E53E3E]">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={patchDimensions.width}
                      onChange={(e) => setPatchDimensions((prev) => ({ ...prev, width: e.target.value }))}
                      className={inputBase}
                      placeholder="Ex: 100"
                      required
                    />
                    <p className="text-xs text-[#7F7F7F] mt-1">Máx: 500mm</p>
                  </div>
                  <div>
                    <label className={labelBase}>
                      Altura (mm) <span className="text-[#E53E3E]">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={patchDimensions.height}
                      onChange={(e) => setPatchDimensions((prev) => ({ ...prev, height: e.target.value }))}
                      className={inputBase}
                      placeholder="Ex: 100"
                      required
                    />
                    <p className="text-xs text-[#7F7F7F] mt-1">Máx: 500mm</p>
                  </div>
                </div>

                <div>
                  <label className={labelBase}>
                    Quantidade <span className="text-[#E53E3E]">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={patchQuantity}
                    onChange={(e) => setPatchQuantity(e.target.value)}
                    className={inputBase}
                    placeholder="Ex: 10"
                    required
                  />
                </div>

                <NoticeBox tone="warning">
                  <span className="font-bold">Atenção:</span> Após enviar este formulário, você será
                  direcionado para o WhatsApp. Por favor, envie uma foto ou imagem de referência do seu
                  design como uma mensagem separada.
                </NoticeBox>

                <div>
                  <label className={labelBase}>
                    Detalhes do Design
                    <span className="text-xs font-normal text-[#7F7F7F] block">
                      Descreva as cores, materiais e detalhes do seu design
                    </span>
                  </label>
                  <textarea
                    value={patchNotes}
                    onChange={(e) => setPatchNotes(e.target.value)}
                    className={`${inputBase} min-h-[100px]`}
                    placeholder="Ex: Fundo preto com letras brancas, borda dourada, tecido de algodão..."
                  />
                </div>

                <NoticeBox tone="info" title="Como enviar seu design">
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Clique no botão abaixo para abrir o WhatsApp</li>
                    <li>O aplicativo irá abrir com uma mensagem pré-preenchida</li>
                    <li>Envie uma foto do seu design como resposta a esta mensagem</li>
                    <li>Certifique-se que a imagem está nítida e mostra todos os detalhes</li>
                  </ol>
                </NoticeBox>

                <WhatsAppButton
                  onClick={handleWhatsAppOrder}
                  disabled={!patchDimensions.width || !patchDimensions.height || !patchQuantity}
                  label="Enviar Pedido e Anexar Design"
                />

                <p className="text-xs text-[#7F7F7F] text-center">
                  Você será redirecionado para o WhatsApp para completar seu pedido
                </p>
              </div>
            </div>
          ) : selectedCategory !== null && CATEGORIES[selectedCategory].name === "Pedido Especial" ? (
            <div className={`${card} p-6`}>
              <h2 className="text-2xl font-bold mb-6">Pedido Especial</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelBase}>
                    Descreva o seu pedido especial com todos os detalhes:
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className={`${inputBase} min-h-[200px]`}
                    placeholder="Por favor, descreva o que precisa com o máximo de detalhes possível, incluindo cores, tamanhos, materiais, etc..."
                  />
                </div>
                <WhatsAppButton
                  onClick={handleWhatsAppOrder}
                  disabled={!customMessage.trim()}
                  label="Enviar Pedido Especial por WhatsApp"
                />
              </div>
            </div>
          ) : selectedSubcategory ? (
            <div className={`${card} p-6`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div
                    ref={imageViewerRef}
                    className="relative bg-[#0a0a0a] border border-border-primary rounded-lg aspect-square flex items-center justify-center overflow-hidden"
                  >
                    {currentCatModel && selectedImage ? (
                      <Image
                        src={`/images/personalizar/${currentCatModel.cat}/${currentCatModel.model}/${imageFolderPrefix}${selectedImage}`}
                        alt={`${selectedSubcategory.name} - ${CATEGORIES[selectedCategory!].name}`}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                        quality={80}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <span className="text-[#7F7F7F] text-sm">Imagem do produto</span>
                    )}
                    {currentCatModel &&
                      (imageMode === "density" || imageMode === "gama") &&
                      selectedImage && (
                        <>
                          <button
                            type="button"
                            onClick={goPrevView}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-2.5 shadow-lg transition-colors"
                            aria-label="Vista anterior"
                          >
                            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            onClick={goNextView}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full p-2.5 shadow-lg transition-colors"
                            aria-label="Vista seguinte"
                          >
                            <ChevronRight className="w-5 h-5" strokeWidth={2} />
                          </button>
                        </>
                      )}
                  </div>
                  {currentCatModel &&
                    (imageMode === "density" || imageMode === "gama") &&
                    selectedImage && (
                      <div className="mt-2 text-xs text-[#A1A1A1]">
                        Vista: {VIEW_LABEL_PT[selectedView]}
                      </div>
                    )}
                </div>

                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">
                    {CATEGORIES[selectedCategory!].name} – {selectedSubcategory.name}
                  </h2>

                  <div className="space-y-6 mt-8">
                    <div>
                      <h3 className="font-semibold mb-3 text-[#EDEDED]">Opções de Personalização</h3>
                      <div className="space-y-4">
                        {currentCatModel &&
                          isModelWithDensity(currentCatModel.cat, currentCatModel.model) && (
                            <div>
                              <label className={labelBase}>Densidade</label>
                              <select
                                className={selectBase}
                                value={density ?? (currentCatModel.model === "POLO" ? "240" : "150")}
                                onChange={(e) => setDensity(e.target.value)}
                              >
                                {currentCatModel.model === "T-SHIRT" && (
                                  <>
                                    <option value="150">150 g/m² — Luanda</option>
                                    <option value="190">190 g/m² — Ankara</option>
                                    {currentCatModel.cat === "QUEEN" && (
                                      <option value="300">300 g/m² — Game Woman</option>
                                    )}
                                  </>
                                )}
                                {currentCatModel.model === "POLO" && (
                                  <option value="240">240 g/m²</option>
                                )}
                              </select>
                            </div>
                          )}

                        {currentCatModel && (imageMode === "density" || imageMode === "gama") ? (
                          <div>
                            <label className={labelBase}>Cor</label>
                            <select
                              className={selectBase}
                              value={selectedColor ?? ""}
                              onChange={(e) => setSelectedColor(e.target.value)}
                              disabled={productImages.length === 0}
                            >
                              <option value="" disabled>
                                {productImages.length > 0 ? "Selecione uma cor" : "Sem cores disponíveis"}
                              </option>
                              {availableColors.map((color) => (
                                <option key={color} value={color}>
                                  {color}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div>
                            <label className={labelBase}>Cor</label>
                            <select
                              className={selectBase}
                              value={selectedImage ?? ""}
                              onChange={(e) => setSelectedImage(e.target.value)}
                              disabled={productImages.length === 0}
                            >
                              <option value="" disabled>
                                {productImages.length > 0 ? "Selecione uma cor" : "Sem cores disponíveis"}
                              </option>
                              {productImages.map((img) => {
                                const code = img.replace(/\.[^.]+$/, "");
                                return (
                                  <option key={img} value={img}>
                                    {COLOR_CODE_MAP[code] || code}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}

                        <div>
                          <label className={labelBase}>Tamanho</label>
                          {isChapeus ? (
                            <div className="w-full border border-border-primary rounded-md p-2 bg-[#0a0a0a] text-sm text-[#A1A1A1]">
                              Tamanho único
                            </div>
                          ) : (
                            <select
                              className={selectBase}
                              aria-label="Tamanho"
                              value={selectedSize}
                              onChange={(e) => setSelectedSize(e.target.value)}
                            >
                              <option value="" disabled>
                                Selecione um tamanho
                              </option>
                              <option value="Pequeno (S)">Pequeno (S)</option>
                              <option value="Médio (M)">Médio (M)</option>
                              <option value="Grande (L)">Grande (L)</option>
                              <option value="Extra Grande (XL)">Extra Grande (XL)</option>
                            </select>
                          )}
                        </div>

                        <div>
                          <label className={labelBase}>Posição do Bordado</label>
                          {isChapeus ? (
                            <div className="w-full border border-border-primary rounded-md p-2 bg-[#0a0a0a] text-sm text-[#A1A1A1]">
                              Frente
                            </div>
                          ) : (
                            <select
                              className={selectBase}
                              value={embroideryPosition}
                              onChange={(e) => setEmbroideryPosition(e.target.value as "Frente" | "Trás")}
                            >
                              <option value="Frente">Frente</option>
                              <option value="Trás">Trás</option>
                            </select>
                          )}
                        </div>

                        <div>
                          <label className={labelBase}>Detalhes da Personalização</label>
                          <textarea
                            className={`${inputBase} min-h-[100px]`}
                            placeholder="Descreva como deseja personalizar o seu item..."
                            value={customizationDetails}
                            onChange={(e) => setCustomizationDetails(e.target.value)}
                          />
                        </div>

                        <NoticeBox tone="warning">
                          <span className="font-bold">Atenção:</span> Após enviar este pedido, você será
                          direcionado para o WhatsApp. Por favor, envie uma foto ou imagem de referência
                          do seu design como uma mensagem separada.
                        </NoticeBox>

                        <NoticeBox tone="info" title="Como enviar seu design">
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Clique no botão abaixo para abrir o WhatsApp</li>
                            <li>O aplicativo irá abrir com uma mensagem pré-preenchida</li>
                            <li>Envie uma foto do seu design como resposta a esta mensagem</li>
                            <li>Certifique-se que a imagem está nítida e mostra todos os detalhes</li>
                          </ol>
                        </NoticeBox>
                      </div>
                    </div>

                    <WhatsAppButton onClick={handleWhatsAppOrder} label="Enviar Pedido por WhatsApp" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${card} p-6 text-center`}>
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-16 w-16 text-[#3a3a3a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-3 text-lg font-medium text-white">Nenhuma categoria selecionada</h3>
                <p className="mt-1 text-sm text-[#A1A1A1]">
                  Selecione uma categoria no menu à esquerda para ver os modelos disponíveis.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
