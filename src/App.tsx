import React, { useState, useEffect } from 'react';
import LegalPagesContainer from './legal'; 
import { 
  ShoppingBag, 
  Search, 
  User, 
  X, 
  Menu, 
  ArrowUpRight, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2,
  Check
} from 'lucide-react';

/* ==========================================================================
   CONSTANTS & ASSETS CONFIGURATION (EASILY SWAP URLS HERE IN VS CODE)
   ========================================================================== */
const CONSTANTS = {
  // Brand Logo URL (Typographic monochrome vector SVG data URI or external URL)
  LOGO_URL: "/LOGO IMG@4x.png",
  
  // Hero Background Streetwear Model
  HERO_BG_URL: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85",
  
  // Editorial / Lookbook Spotlight Image
  EDITORIAL_IMG_URL: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",

  // Product Catalog Images (Unsplash Dark Fashion / Luxury Streetwear)
  PRODUCTS: [
    {
      id: "anon-001",
      name: "ANON HEAVYWEIGHT HOODIE — CARBON",
      category: "TOPS",
      price: 4499,
      formattedPrice: "₹4,499",
      sku: "AN-FW26-001",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      tag: "500 GSM // FRENCH TERRY",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "anon-002",
      name: "ARCHIVE RAW-EDGE DENIM — WASHED ONYX",
      category: "BOTTOMS",
      price: 5999,
      formattedPrice: "₹5,999",
      sku: "AN-FW26-002",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      tag: "14.5 OZ SELVEDGE",
      sizes: ["30", "32", "34", "36"]
    },
    {
      id: "anon-003",
      name: "TACTICAL CARGO UTILITY PANT — OBSIDIAN",
      category: "BOTTOMS",
      price: 4899,
      formattedPrice: "₹4,899",
      sku: "AN-FW26-003",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
      tag: "WATER RESISTANT RIPSTOP",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "anon-004",
      name: "GRAPHIC BOXY TEE — 'NO SECOND THOUGHT'",
      category: "TOPS",
      price: 2499,
      formattedPrice: "₹2,499",
      sku: "AN-FW26-004",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      tag: "280 GSM COMBED COTTON",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "anon-005",
      name: "STRUCTURED BOXY BOMBER — NIGHTFALL",
      category: "OUTERWEAR",
      price: 7999,
      formattedPrice: "₹7,999",
      sku: "AN-FW26-005",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      tag: "MATTE NYLON // THERMAL",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "anon-006",
      name: "DISTRESSED ACID WASH LONGSLEEVE",
      category: "TOPS",
      price: 3299,
      formattedPrice: "₹3,299",
      sku: "AN-FW26-006",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",
      tag: "HAND-DISTRESSED MOTIF",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: "anon-007",
      name: "ANON HARDWARE CROSSBODY — MATTE NOIR",
      category: "ACCESSORIES",
      price: 3499,
      formattedPrice: "₹3,499",
      sku: "AN-FW26-007",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
      tag: "COBRA BUCKLE HARDWARE",
      sizes: ["ONE SIZE"]
    },
    {
      id: "anon-008",
      name: "OVERSIZED MOTO RACER JACKET",
      category: "OUTERWEAR",
      price: 9499,
      formattedPrice: "₹9,499",
      sku: "AN-FW26-008",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
      tag: "VEGAN LEATHER EMBOSSED",
      sizes: ["S", "M", "L", "XL"]
    }
  ]
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  image: string;
  size: string;
  quantity: number;
}

export default function App() {
  // Navigation & Drawer States
  const [showLegalPage, setShowLegalPage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  // Shopping & Interaction States
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "anon-001",
      name: "ANON HEAVYWEIGHT HOODIE — CARBON",
      price: 4499,
      formattedPrice: "₹4,499",
      image: CONSTANTS.PRODUCTS[0].image,
      size: "L",
      quantity: 1
    }
  ]);
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({
    "anon-001": "L",
    "anon-002": "32",
    "anon-003": "M",
    "anon-004": "L",
    "anon-005": "XL",
    "anon-006": "M",
    "anon-007": "ONE SIZE",
    "anon-008": "L"
  });
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Cart operations
  const handleAddToCart = (product: typeof CONSTANTS.PRODUCTS[0]) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === chosenSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === chosenSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          formattedPrice: product.formattedPrice,
          image: product.image,
          size: chosenSize,
          quantity: 1
        }
      ];
    });

    setToastMessage(`ADDED TO BAG: ${product.name} [SIZE: ${chosenSize}]`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered products
  const filteredProducts = CONSTANTS.PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
    }
  };

  // ==========================================
  // LIVE BACKEND INTEGRATION: CHECKOUT HANDLER
  // ==========================================
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const orderData = {
      customerName: "Ashish Shrivastava",
      customerEmail: "vip.customer@anon.in",
      address: "Pandri Market, Raipur, Chhattisgarh", 
      cartItems: cart,
      totalAmount: cartTotal,
      paymentMode: "CASH ON DELIVERY"
    };

    setToastMessage("PROCESSING SECURE CHECKOUT...");

    try {
      const response = await fetch("https://anon-backend-chi.vercel.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      if (data.success) {
        setToastMessage("ORDER PLACED! CHECK EMAIL INBOX.");
        setCart([]); // Resetting cart to empty
        setTimeout(() => setIsCartOpen(false), 2000); 
      } else {
        setToastMessage("SERVER ERROR: COULD NOT PLACE ORDER");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setToastMessage("FAILED TO CONNECT TO BACKEND");
    }
  };

  return (
    <>
      {showLegalPage ? (
        <LegalPagesContainer onBack={() => { setShowLegalPage(false); window.scrollTo(0, 0); }} />
      ) : (
        <div id="anon-app-root" className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
          
          <aside id="promotional-banner" className="w-full bg-zinc-950 border-b border-zinc-900 py-1.5 px-4 text-xs font-mono tracking-widest uppercase overflow-hidden">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="hidden sm:flex items-center space-x-3 text-zinc-500 text-[10px]">
                <span>LOC: NEW DELHI // MUMBAI // BLR</span>
                <span>•</span>
                <span className="text-zinc-400">STATUS: DROP 01 LIVE</span>
              </div>
              <div className="w-full sm:w-auto text-center font-semibold text-zinc-200">
                <span>FREE SHIPPING PAN INDIA // NO SECOND THOUGHT</span>
              </div>
              <div className="hidden sm:flex items-center space-x-3 text-zinc-500 text-[10px]">
                <span>WORLDWIDE COURIER DISPATCH</span>
                <span>•</span>
                <span className="text-white font-bold">2026 ARCHIVE</span>
              </div>
            </div>
          </aside>

          <header id="primary-header" className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-zinc-900 transition-colors">
            <nav id="main-navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <div className="flex items-center lg:hidden">
                <button
                  id="mobile-menu-toggle-btn"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-white hover:text-zinc-400 rounded-none focus:outline-none focus:ring-1 focus:ring-white"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <div className="hidden lg:flex items-center space-x-8 text-xs tracking-widest uppercase font-mono font-medium">
                <a href="#drop-catalog" className="text-white hover:text-zinc-400 transition-colors py-2 relative group">
                  Shop
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                </a>
                <a href="#drop-archive" className="text-zinc-400 hover:text-white transition-colors py-2 relative group">
                  Archive
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                </a>
                <a href="#brand-story" className="text-zinc-400 hover:text-white transition-colors py-2 relative group">
                  Story
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                </a>
              </div>

              <div className="flex-1 lg:flex-none flex justify-center items-center">
                <a href="#" className="inline-block focus:outline-none focus:ring-1 focus:ring-white p-1">
                  <img 
                    id="brand-logo-img"
                    src={CONSTANTS.LOGO_URL} 
                    alt="ANON Luxury Streetwear" 
                    className="h-20 sm:h-24 w-auto object-contain select-none rounded-none"
                    loading="eager"
                  />
                </a>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-6">
                <button
                  id="nav-search-btn"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-white hover:text-zinc-400 transition-colors rounded-none focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <Search size={20} strokeWidth={1.75} />
                </button>
                <button
                  id="nav-account-btn"
                  onClick={() => setIsAccountOpen(true)}
                  className="p-2 text-white hover:text-zinc-400 transition-colors rounded-none focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <User size={20} strokeWidth={1.75} />
                </button>
                <button
                  id="nav-cart-btn"
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-white hover:text-zinc-400 transition-colors relative rounded-none focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <ShoppingBag size={20} strokeWidth={1.75} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black font-mono text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-none">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </nav>

            {isMobileMenuOpen && (
              <div id="mobile-nav-drawer" className="lg:hidden bg-black border-b border-zinc-800 px-6 py-8 space-y-6 animate-fadeIn">
                <div className="flex flex-col space-y-4 font-mono text-sm tracking-widest uppercase">
                  <a href="#drop-catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-zinc-400 border-b border-zinc-900 pb-3 flex justify-between items-center">
                    <span>SHOP DROP 01</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#drop-archive" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white border-b border-zinc-900 pb-3 flex justify-between items-center">
                    <span>THE ARCHIVE</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#brand-story" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white border-b border-zinc-900 pb-3 flex justify-between items-center">
                    <span>BRAND MANIFESTO</span>
                    <ChevronRight size={16} />
                  </a>
                </div>
                <div className="pt-4 text-xs font-mono text-zinc-500 space-y-2">
                  <p>SUPPORT // CONCIERGE@ANON-STUDIOS.COM</p>
                  <p>LOCATION // INDIA / FLAGSHIP 2026</p>
                </div>
              </div>
            )}
          </header>

          <section id="hero-section" className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-zinc-900">
            <div className="absolute inset-0 z-0">
              <img 
                id="hero-bg-image"
                src={CONSTANTS.HERO_BG_URL} 
                alt="ANON High-End Streetwear Model" 
                className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 select-none rounded-none"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
            </div>

            <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-10 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-white rounded-none"></span>
                <span>AUTONOMOUS LUXURY // EDITION 01</span>
              </div>
              <div className="hidden md:block">
                <span>SEASON: FALL/WINTER 2026</span>
              </div>
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center">
              <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-400 mb-4">
                LIMITED CAPSULE DROP // 001
              </p>
              
              <h1 id="hero-main-title" className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white leading-none mb-8 sm:mb-10 select-none">
                NO SECOND <br className="hidden sm:inline" /> THOUGHT
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#drop-catalog" className="bg-white text-black hover:bg-zinc-200 transition-all duration-150 px-10 py-4 font-heading font-bold text-sm tracking-widest uppercase border border-white rounded-none flex items-center space-x-3 group">
                  <span>EXPLORE DROP 1</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a href="#brand-story" className="bg-transparent text-white hover:bg-white hover:text-black transition-all duration-150 px-8 py-4 font-heading font-bold text-sm tracking-widest uppercase border border-zinc-700 hover:border-white rounded-none">
                  VIEW LOOKBOOK
                </a>
              </div>

              <p className="mt-8 font-mono text-[11px] text-zinc-400 tracking-widest uppercase max-w-md mx-auto">
                CUSTOM 500 GSM HEAVYWEIGHT KNITS • ZERO RE-STOCKS • STRICTLY MONOCHROME
              </p>
            </div>

            <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end z-10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <div className="flex flex-col space-y-1">
                <span>SYS: 28.6139° N, 77.2090° E</span>
                <span>ALL RIGHTS RESERVED // ANON STUDIOS</span>
              </div>
              <div className="animate-bounce text-white">
                <span className="block text-center mb-1 text-[9px]">SCROLL</span>
                <span className="block w-px h-6 bg-white mx-auto"></span>
              </div>
            </div>
          </section>

          <section id="ticker-tape-section" className="w-full bg-white text-black py-3 sm:py-4 overflow-hidden border-y border-white select-none">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="flex items-center space-x-8 px-4 font-heading font-bold text-lg sm:text-2xl tracking-tighter uppercase">
                  <span>ANON</span>
                  <span className="opacity-40">//</span>
                  <span>DROP 1</span>
                  <span className="opacity-40">//</span>
                  <span>AUTHENTIC STREET LUXURY</span>
                  <span className="opacity-40">//</span>
                  <span>NO SECOND THOUGHT</span>
                  <span className="opacity-40">//</span>
                </div>
              ))}
            </div>
          </section>

          <section id="drop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-10 gap-6">
              <div>
                <div className="flex items-center space-x-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">
                  <span className="w-2 h-2 bg-white inline-block rounded-none"></span>
                  <span>CATALOG // READY TO WEAR</span>
                </div>
                <h2 id="catalog-heading" className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
                  NEW ARRIVALS
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 font-mono text-xs tracking-widest uppercase">
                {["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "ACCESSORIES"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 border rounded-none transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-black border-white font-bold"
                        : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const currentSize = selectedSizes[product.id] || product.sizes[0];
                return (
                  <article key={product.id} className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors duration-200 rounded-none relative">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 rounded-none"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-zinc-800 px-2 py-1 text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                        {product.tag}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-200 flex flex-col gap-2">
                        {product.sizes.length > 1 && (
                          <div className="flex items-center justify-center gap-1.5 bg-black/90 py-1.5 border border-zinc-800">
                            <span className="text-[10px] font-mono text-zinc-400 mr-1">SIZE:</span>
                            {product.sizes.map((sz) => (
                              <button
                                key={sz}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSizes((prev) => ({ ...prev, [product.id]: sz }));
                                }}
                                className={`px-2 py-0.5 text-[10px] font-mono border rounded-none transition-colors ${
                                  currentSize === sz
                                    ? "bg-white text-black border-white font-bold"
                                    : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500"
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 font-heading font-bold text-xs tracking-widest uppercase py-3 border border-white rounded-none flex items-center justify-center space-x-2 transition-colors"
                        >
                          <ShoppingBag size={14} />
                          <span>ADD TO BAG</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between bg-zinc-950 border-t border-zinc-900">
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                          <span>{product.sku}</span>
                          <span>{product.category}</span>
                        </div>
                        <h3 className="font-heading text-sm sm:text-base font-semibold uppercase tracking-wide text-zinc-100 group-hover:text-white transition-colors leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between">
                        <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                          {product.formattedPrice}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                          TAX INCL.
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 border border-dashed border-zinc-800 p-8">
                <p className="font-heading text-xl uppercase tracking-wider text-zinc-400">
                  NO PIECES MATCHING SEARCH CRITERIA
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                  }}
                  className="mt-4 bg-white text-black px-6 py-2.5 font-heading text-xs uppercase tracking-widest border border-white rounded-none"
                >
                  RESET CATALOG FILTERS
                </button>
              </div>
            )}
          </section>

          <section id="brand-story" className="w-full bg-zinc-950 border-y border-zinc-900 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/5] w-full border border-zinc-800 bg-zinc-900">
                    <img 
                      src={CONSTANTS.EDITORIAL_IMG_URL} 
                      alt="ANON Editorial Drop 01 Silhouette"
                      className="w-full h-full object-cover filter grayscale contrast-125 select-none rounded-none"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/90 border border-zinc-800 p-3 font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
                      FIG. 01 // ARCHIVAL SILHOUETTE MATRIX
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="font-mono text-xs tracking-widest uppercase text-zinc-500">
                    MANIFESTO // DROP 01
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none">
                    CONSTRUCTED IN SILENCE. <br /> WORN WITH CONVICTION.
                  </h2>
                  <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                    ANON was engineered to discard the ornamental fluff of modern fashion. 
                    We engineer pure silhouettes with uncompromising heavyweight textiles, stark geometric cuts, 
                    and a brutalist monochrome discipline. Each garment is manufactured in limited editions of 100 units.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-900 font-mono text-xs">
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest mb-1">TEXTILE DENSITY</div>
                      <div className="text-white text-base font-bold font-heading tracking-wide">500 GSM HEAVYWEIGHT</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest mb-1">ORIGIN CODE</div>
                      <div className="text-white text-base font-bold font-heading tracking-wide">IND-ARCHIVE // 2026</div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <a href="#drop-catalog" className="inline-flex items-center space-x-3 text-white border-b-2 border-white pb-1 font-heading text-sm uppercase tracking-widest hover:text-zinc-400 hover:border-zinc-400 transition-colors">
                      <span>ACQUIRE FROM DROP 01</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="drop-archive" className="w-full bg-black py-4 border-b border-zinc-900 overflow-hidden select-none text-zinc-600 font-mono text-xs tracking-[0.3em] uppercase">
            <div className="animate-marquee-reverse whitespace-nowrap flex items-center">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="flex items-center space-x-8 px-4">
                  <span>ZERO LOGO OVERLOAD</span>
                  <span>//</span>
                  <span>ARCHIVAL CUTS ONLY</span>
                  <span>//</span>
                  <span>LIMITED TO 100 PIECES PER STYLE</span>
                  <span>//</span>
                  <span>SECURE COURIER DISPATCH</span>
                  <span>//</span>
                </div>
              ))}
            </div>
          </section>

          <footer id="primary-footer" className="w-full bg-black border-t border-zinc-900 text-zinc-400 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
                <div className="lg:col-span-5 space-y-4">
                  <span className="font-heading text-2xl font-bold text-white tracking-wider uppercase block">
                    ANON
                  </span>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest max-w-sm leading-relaxed">
                    Brutalist luxury streetwear capsule. Engineered with obsessive proportions and heavy textures.
                  </p>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                    <span className="text-white">SUBSCRIBE FOR DROP ALERTS</span>
                    <span className="text-zinc-600">VIP ACCESS ONLY</span>
                  </div>
                  {newsletterSubmitted ? (
                    <div className="py-3 px-4 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs uppercase tracking-widest flex items-center space-x-2">
                      <Check size={16} className="text-white" />
                      <span>YOU ARE ON THE LIST // ACCESS GRANTED FOR DROP 02</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex items-center">
                      <input 
                        type="email" 
                        required
                        placeholder="ENTER YOUR EMAIL FOR EARLY ACCESS..."
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-zinc-700 focus:border-white focus:outline-none text-white text-sm font-mono placeholder:text-zinc-600 placeholder:text-xs tracking-wider py-3.5 px-0 rounded-none transition-colors"
                      />
                      <button type="submit" className="ml-4 bg-white text-black hover:bg-zinc-200 px-6 py-3.5 font-heading font-bold text-xs uppercase tracking-widest whitespace-nowrap border border-white rounded-none transition-colors">
                        SUBSCRIBE
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-zinc-900 font-mono text-xs tracking-wider uppercase">
                <div>
                  <div className="text-white font-semibold mb-4">COLLECTION</div>
                  <ul className="space-y-2.5 text-zinc-500">
                    <li><a href="#drop-catalog" className="hover:text-white transition-colors">DROP 01 CAPSULE</a></li>
                    <li><a href="#drop-catalog" className="hover:text-white transition-colors">HEAVYWEIGHT HOODIES</a></li>
                    <li><a href="#drop-catalog" className="hover:text-white transition-colors">RAW DENIM ARCHIVE</a></li>
                    <li><a href="#drop-catalog" className="hover:text-white transition-colors">TACTICAL CARGO</a></li>
                  </ul>
                </div>
                <div>
                  <div className="text-white font-semibold mb-4">CLIENT CARE</div>
                  <ul className="space-y-2.5 text-zinc-500">
                    <li><a href="#shipping" onClick={(e) => { e.preventDefault(); alert("DOMESTIC SHIPPING: FREE ACROSS PAN-INDIA VIA BLUEDART EXPRESS (2-4 BUSINESS DAYS)."); }} className="hover:text-white transition-colors">SHIPPING POLICY</a></li>
                    <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert("RETURNS & EXCHANGES ACCEPTED WITHIN 7 DAYS IN UNWORN CONDITION WITH TAGS INTACT."); }} className="hover:text-white transition-colors">EXCHANGES</a></li>
                    <li><a href="#tracking" onClick={(e) => { e.preventDefault(); alert("ENTER YOUR 10-DIGIT ORDER NUMBER IN THE TRACKING CONSOLE."); }} className="hover:text-white transition-colors">ORDER TRACKING</a></li>
                    <li><a href="#size-guide" onClick={(e) => { e.preventDefault(); alert("SIZE GUIDE: ALL ANON TOPS FEATURE AN OVERSIZED BOXY FIT. ORDER TRUE-TO-SIZE FOR STANDARD OVERSIZED DRAPE."); }} className="hover:text-white transition-colors">SIZE GUIDE</a></li>
                  </ul>
                </div>
                <div>
                  <div className="text-white font-semibold mb-4">STUDIOS</div>
                  <ul className="space-y-2.5 text-zinc-500">
                    <li><a href="#brand-story" className="hover:text-white transition-colors">MANUFACTURE ARCHIVE</a></li>
                    <li><a href="#brand-story" className="hover:text-white transition-colors">SUSTAINABILITY MATRIX</a></li>
                    <li><a href="#brand-story" className="hover:text-white transition-colors">STOCKISTS</a></li>
                    <li><a href="#brand-story" className="hover:text-white transition-colors">CAREERS</a></li>
                  </ul>
                </div>
                <div>
                  <div className="text-white font-semibold mb-4">CONNECT</div>
                  <ul className="space-y-2.5 text-zinc-500">
                    <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between"><span>INSTAGRAM</span><ArrowUpRight size={12} /></a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between"><span>TWITTER / X</span><ArrowUpRight size={12} /></a></li>
                    <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center justify-between"><span>COMMUNITY</span><ArrowUpRight size={12} /></a></li>
                    <li><a href="mailto:concierge@anon-studios.com" className="hover:text-white transition-colors">CONCIERGE</a></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-600 uppercase tracking-widest gap-4">
                <p id="copyright-text">
                  © 2026 ANON. ALL RIGHTS RESERVED.
                </p>
                <div className="flex space-x-6 text-zinc-500">
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setShowLegalPage(true); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">TERMS OF SERVICE</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Cart, Search, and Account Modals (Rendered outside the main view container so they work flawlessly) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-black border-l border-zinc-800 h-full flex flex-col justify-between p-6 sm:p-8 rounded-none overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag size={18} className="text-white" />
                  <span className="font-heading font-bold text-lg uppercase tracking-wider text-white">
                    YOUR BAG ({cartItemCount})
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 text-zinc-400 hover:text-white rounded-none focus:outline-none">
                  <X size={20} />
                </button>
              </div>
              <div className="my-4 bg-zinc-950 border border-zinc-900 p-2.5 text-center font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                COMPLIMENTARY EXPRESS DISPATCH APPLIED
              </div>
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-heading text-lg text-zinc-500 uppercase tracking-widest">YOUR BAG IS EMPTY</p>
                  <button onClick={() => setIsCartOpen(false)} className="bg-white text-black px-6 py-2.5 font-heading text-xs uppercase tracking-widest font-bold border border-white rounded-none">
                    DISCOVER DROP 01
                  </button>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border border-zinc-900 bg-zinc-950 p-3 rounded-none">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover filter grayscale contrast-110 rounded-none bg-zinc-900 flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-heading text-xs uppercase tracking-wider text-white font-semibold line-clamp-1">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id, item.size)} className="text-zinc-600 hover:text-white transition-colors ml-2"><Trash2 size={14} /></button>
                          </div>
                          <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mt-0.5">SIZE: {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900">
                          <div className="flex items-center border border-zinc-800 rounded-none">
                            <button onClick={() => updateCartQuantity(item.id, item.size, -1)} className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800"><Minus size={12} /></button>
                            <span className="px-3 py-1 font-mono text-xs text-white font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.size, 1)} className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800"><Plus size={12} /></button>
                          </div>
                          <span className="font-mono text-xs font-bold text-white tracking-wider">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-zinc-800 pt-6 mt-6 space-y-4">
                <div className="space-y-2 font-mono text-xs tracking-widest uppercase">
                  <div className="flex justify-between text-zinc-400"><span>SUBTOTAL</span><span className="text-white font-bold">₹{cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-zinc-400"><span>PAN INDIA SHIPPING</span><span className="text-white font-bold">FREE</span></div>
                  <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-zinc-900"><span>TOTAL</span><span>₹{cartTotal.toLocaleString()}</span></div>
                </div>
                <button onClick={handleCheckout} className="w-full bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 font-heading font-bold text-sm tracking-widest uppercase py-4 border border-white rounded-none flex items-center justify-center space-x-2 transition-colors">
                  <span>CHECKOUT NOW</span>
                  <ArrowUpRight size={18} />
                </button>
                <p className="text-center font-mono text-[9px] text-zinc-600 tracking-widest uppercase">ENCRYPTED 256-BIT SSL TRANSACTION // INSTANT CONFIRMATION</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-6 sm:p-12 animate-fadeIn">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">CATALOG QUERY CONSOLE</span>
              <button onClick={() => setIsSearchOpen(false)} className="text-zinc-400 hover:text-white rounded-none focus:outline-none"><X size={24} /></button>
            </div>
            <div className="relative">
              <input 
                type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH HOODIE, DENIM, TEE, CARGO..."
                className="w-full bg-transparent border-0 border-b-2 border-white text-2xl sm:text-4xl font-heading uppercase text-white placeholder:text-zinc-700 focus:outline-none pb-4 rounded-none"
              />
              <Search className="absolute right-2 top-2 text-zinc-500" size={32} />
            </div>
            <div className="mt-8">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">POPULAR SEARCHES:</p>
              <div className="flex flex-wrap gap-2">
                {["500 GSM HOODIE", "SELVEDGE DENIM", "OBSIDIAN CARGO", "NO SECOND THOUGHT", "BOMBER"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term); setIsSearchOpen(false);
                      document.getElementById("drop-catalog")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border border-zinc-800 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:border-white hover:text-white transition-colors rounded-none"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            {searchQuery && (
              <div className="mt-10">
                <button
                  onClick={() => { setIsSearchOpen(false); document.getElementById("drop-catalog")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="bg-white text-black px-6 py-3 font-heading font-bold text-xs uppercase tracking-widest border border-white rounded-none"
                >
                  VIEW RESULTS IN CATALOG ({filteredProducts.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isAccountOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-none relative">
            <button onClick={() => setIsAccountOpen(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-white rounded-none"><X size={20} /></button>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">CLIENT ID CONSOLE</div>
            <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-6">ANON VIP ACCESS</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("VIP PROFILE CONNECTED // PRE-DROP ACCESS GRANTED."); setIsAccountOpen(false); }} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5">MOBILE / EMAIL</label>
                <input type="text" required placeholder="+91 OR EMAIL" className="w-full bg-black border border-zinc-800 px-3 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none rounded-none" />
              </div>
              <div>
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1.5">PASSCODE / OTP</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-black border border-zinc-800 px-3 py-2.5 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none rounded-none" />
              </div>
              <button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 font-heading font-bold text-xs uppercase tracking-widest py-3 border border-white rounded-none transition-colors mt-4">
                ACCESS ACCOUNT
              </button>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 border border-white shadow-2xl font-mono text-xs uppercase tracking-widest flex items-center space-x-3 rounded-none animate-slideUp">
          <span className="w-2 h-2 bg-black rounded-none"></span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-black hover:opacity-60 ml-2"><X size={14} /></button>
        </div>
      )}

    </>
  );
}