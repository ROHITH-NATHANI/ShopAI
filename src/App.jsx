import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Wireless Pro Headphones", price: 149.99, category: "Electronics", rating: 4.8, reviews: 2341, img: "/images/headphones.png", badge: "Best Seller", desc: "Premium sound with ANC & 40hr battery.", stock: 12 },
  { id: 2, name: "Minimalist Leather Watch", price: 229.99, category: "Fashion", rating: 4.6, reviews: 876, img: "/images/watch.png", badge: "New", desc: "Italian leather strap, sapphire crystal glass.", stock: 5 },
  { id: 3, name: "Organic Green Tea Set", price: 34.99, category: "Food", rating: 4.9, reviews: 3120, img: "/images/tea_set.png", badge: "Top Rated", desc: "Premium matcha blend from Uji, Japan.", stock: 50 },
  { id: 4, name: "Mechanical Keyboard", price: 189.99, category: "Electronics", rating: 4.7, reviews: 1542, img: "/images/keyboard.png", badge: "Hot", desc: "Cherry MX switches, RGB backlit, TKL layout.", stock: 8 },
  { id: 5, name: "Yoga Mat Premium", price: 59.99, category: "Sports", rating: 4.5, reviews: 654, img: "/images/yoga_mat.png", badge: "", desc: "Non-slip, eco-friendly, 6mm cushioning.", stock: 30 },
  { id: 6, name: "Cold Brew Coffee Kit", price: 44.99, category: "Food", rating: 4.8, reviews: 987, img: "/images/cold_brew.png", badge: "Trending", desc: "Everything you need for perfect cold brew.", stock: 22 },
  { id: 7, name: "Smart Fitness Band", price: 79.99, category: "Electronics", rating: 4.4, reviews: 2100, img: "/images/fitness_band.png", badge: "", desc: "Heart rate, SpO2, sleep tracking, 7-day battery.", stock: 18 },
  { id: 8, name: "Ceramic Planter Set", price: 49.99, category: "Home", rating: 4.7, reviews: 432, img: "/images/planter_set.png", badge: "New", desc: "Set of 3 handcrafted ceramic pots with trays.", stock: 14 },
  { id: 9, name: "Sunglasses Aviator", price: 119.99, category: "Fashion", rating: 4.5, reviews: 788, img: "/images/sunglasses.png", badge: "", desc: "Polarized UV400 lenses, stainless steel frame.", stock: 20 },
  { id: 10, name: "Portable Blender", price: 39.99, category: "Home", rating: 4.6, reviews: 1234, img: "/images/blender.png", badge: "Best Seller", desc: "USB-C rechargeable, 6-blade, 350ml capacity.", stock: 35 },
  { id: 11, name: "Running Shoes X1", price: 134.99, category: "Sports", rating: 4.8, reviews: 3456, img: "/images/shoes.png", badge: "Top Rated", desc: "Lightweight foam sole, breathable mesh upper.", stock: 9 },
  { id: 12, name: "Scented Candle Set", price: 29.99, category: "Home", rating: 4.9, reviews: 2200, img: "/images/candles.png", badge: "Trending", desc: "Set of 4 soy wax candles, 40hr burn each.", stock: 60 },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Food", "Sports", "Home"];
const HERO_BGS = ["/images/hero_bg_1.png", "/images/hero_bg_2.png", "/images/hero_bg_3.png"];

const TECH_STACK = [
  { name: "React", color: "#61DAFB", icon: "⚛️", role: "UI Framework", desc: "State-driven modular architecture" },
  { name: "Next.js", color: "#818CF8", icon: "▲", role: "Core Engine", desc: "Optimized SSR and edge routing" },
  { name: "Claude AI", color: "#F43F5E", icon: "🤖", role: "AI Assistant", desc: "Intelligent product curation" },
  { name: "Framer", color: "#A855F7", icon: "✨", role: "Design", desc: "Fluid motion and micro-interactions" },
  { name: "Node.js", color: "#10B981", icon: "🟢", role: "Backend", desc: "High-performance event loop" },
  { name: "Vite", color: "#D97706", icon: "⚡", role: "Bundler", desc: "Lightning fast development" },
];

// ── CUSTOM HOOKS ──────────────────────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  const setValue = (value) => {
    try {
      const v = value instanceof Function ? value(storedValue) : value;
      setStoredValue(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) { console.error(e); }
  };
  return [storedValue, setValue];
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const Shimmer = () => (
  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#f1f5f9" }}>
    <motion.div initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
  </div>
);

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useLocalStorage("shopai-cart-v2", []);
  const [wishlist, setWishlist] = useLocalStorage("shopai-wishlist-v2", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("shopai-theme-v2", false);
  
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [aiOpen, setAiOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState(300);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "👋 Hi! I'm ShopAI. I can help you find products, compare specs, or suggest the perfect bundle! What are you looking for today?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiEndRef = useRef(null);

  // Interval for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % HERO_BGS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    notify(`🛒 ${p.name} added to cart!`);
  };

  const toggleWishlist = (p) => {
    setWishlist(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  let filtered = PRODUCTS
    .filter(p => category === "All" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= priceRange);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const sendAI = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = { role: "user", content: aiInput };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput("");
    setAiLoading(true);

    // Dynamic Bundle Suggester
    const isBundleReq = aiInput.toLowerCase().includes("bundle") || aiInput.toLowerCase().includes("suggest");
    const suggested = isBundleReq ? PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)] : null;

    setTimeout(() => {
      let reply = "I can definitely help with that! ShopAI is designed to find you the best deals.";
      if (suggested) reply = `Based on your request, I highly recommend the **${suggested.name}**. It's currently trending in ${suggested.category} and would make a great addition to your setup!`;
      setAiMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setAiLoading(false);
    }, 1200);
  };

  useEffect(() => aiEndRef.current?.scrollIntoView({ behavior: "smooth" }), [aiMessages, aiLoading]);

  const t = isDarkMode ? darkTheme : lightTheme;
  const s = getStyles(t);

  return (
    <div style={s.root}>
      {/* NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} style={s.notif}>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <motion.div whileHover={{ scale: 1.05 }} style={s.logo} onClick={() => setPage("home")}>
            <span style={s.logoIcon}>⚡</span>
            <span style={s.logoText}>Shop<span style={{ color: t.primary }}>AI</span></span>
          </motion.div>
          <div style={s.navLinks}>
            {["home", "stack", "cart"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{ ...s.navBtn, ...(page === p ? s.navBtnActive : {}) }}>
                {p === "cart" ? `🛒 ${cartCount > 0 ? `(${cartCount})` : "Cart"}` : p === "stack" ? "🛠️ Architecture" : "🏠 Store"}
              </button>
            ))}
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={s.themeToggle}>{isDarkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
          <button style={s.aiBtn} onClick={() => setAiOpen(o => !o)}>🤖 AI Chat</button>
        </div>
      </nav>

      {/* AI PANEL */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} style={s.aiPanel}>
            <div style={s.aiHeader}><span>🤖 ShopAI Concierge</span><button onClick={() => setAiOpen(false)} style={s.aiClose}>✕</button></div>
            <div style={s.aiBody}>
              {aiMessages.map((m, i) => (
                <div key={i} style={{ ...s.aiMsg, ...(m.role === "user" ? s.aiMsgUser : s.aiMsgBot) }}>
                  <div style={{ ...s.aiMsgBubble, ...(m.role === "user" ? s.aiMsgBubbleUser : s.aiMsgBubbleBot) }}>{m.content}</div>
                </div>
              ))}
              {aiLoading && <div style={{ padding: 12 }}><Shimmer /></div>}
              <div ref={aiEndRef} />
            </div>
            <div style={s.aiFooter}>
              <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAI()} placeholder="Ask something..." style={s.aiInput} />
              <button onClick={sendAI} style={s.aiSend}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={s.content}>
        {page === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* HERO */}
            <div style={s.hero}>
              <div style={{ ...s.heroSlider, transform: `translateX(-${currentSlide * 33.333}%)` }}>
                {HERO_BGS.map((bg, i) => <img key={i} src={bg} alt="" style={s.heroSlide} />)}
              </div>
              <div style={s.heroOverlay} />
              <div style={s.heroContent}>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={s.heroTag}>✨ Next-Gen Shopping</motion.div>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={s.heroTitle}>The Future of<br /><span style={s.heroGrad}>E-Commerce</span></motion.h1>
                <div style={s.heroBtns}>
                  <button style={s.heroBtnPrimary} onClick={() => setQuizOpen(true)}>Start AI Style Quiz</button>
                  <button style={s.heroBtnSecondary} onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Browse Store</button>
                </div>
              </div>
            </div>

            {/* SEARCH / FILTERS */}
            <div id="products" style={s.filterBar}>
              <div style={s.filterRow}>
                <div style={s.semanticSearch}>
                   <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: t.primary }}>🤖</span>
                   <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try 'Find me gadgets for a minimalist office'..." style={s.searchInput} />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)} style={s.select}>
                   <option value="popular">Popularity</option>
                   <option value="rating">Top Rated</option>
                   <option value="price-asc">Price: Low-High</option>
                </select>
              </div>
              <div style={s.catRow}>
                {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} style={{ ...s.catBtn, ...(category === c ? s.catBtnActive : {}) }}>{c}</button>)}
                <div style={s.priceFilter}><span>Max: ${priceRange}</span><input type="range" min={20} max={300} value={priceRange} onChange={e => setPriceRange(+e.target.value)} style={s.range} /></div>
              </div>
            </div>

            {/* GRID */}
            <div style={s.grid}>
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.1 }}
                  style={s.card} onClick={() => setSelectedProduct(p)}>
                  {p.badge && <div style={s.badge}>{p.badge}</div>}
                  <div style={s.cardImgOuter}>
                    {!imgLoaded[p.id] && <Shimmer />}
                    <img src={p.img} alt="" style={{ ...s.cardImg, display: imgLoaded[p.id] ? "block" : "none" }} onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))} />
                  </div>
                  <div style={s.cardCat}>{p.category}</div>
                  <div style={s.cardName}>{p.name}</div>
                  <div style={s.cardBottom}><div style={s.cardPrice}>${p.price}</div><button style={s.addBtn} onClick={e => { e.stopPropagation(); addToCart(p); }}>+ Cart</button></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {page === "stack" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "40px 0" }}>
            <h2 style={s.pageTitle}>🛠️ Live Architecture</h2>
            <div style={s.stackGrid}>
               {TECH_STACK.map((tech, i) => (
                 <motion.div key={tech.name} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
                   whileHover={{ y: -10 }} style={s.stackCard}>
                   <div style={{ fontSize: 48, marginBottom: 16 }}>{tech.icon}</div>
                   <h3 style={{ color: tech.color, fontWeight: 900 }}>{tech.name}</h3>
                   <div style={{ color: t.textSecondary, fontSize: 13, marginTop: 4 }}>{tech.role}</div>
                   <p style={{ color: t.textSecondary, fontSize: 12, marginTop: 12 }}>{tech.desc}</p>
                   <div style={s.dataPulse} />
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={s.cartPage}>
            <h2 style={s.pageTitle}>Your Cart ({cartCount})</h2>
            {cart.length === 0 ? <div style={s.empty}>Your cart is lonely.</div> : (
              <div style={s.cartLayout}>
                <div style={s.cartItems}>{cart.map(item => (
                  <div key={item.id} style={s.cartItem}>
                    <img src={item.img} alt="" style={s.cartItemImg} />
                    <div style={s.cartItemInfo}><div>{item.name}</div><div style={{ color: t.primary, fontWeight: 900 }}>${item.price}</div></div>
                    <div style={s.qtyControl}><button onClick={() => updateQty(item.id, -1)}>−</button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}>+</button></div>
                    <button onClick={() => removeFromCart(item.id)} style={s.removeBtn}>🗑️</button>
                  </div>
                ))}</div>
                <div style={s.cartSummary}>
                  <div style={s.summaryRow}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div style={s.summaryRow}><span>Tax</span><span>${(cartTotal * 0.08).toFixed(2)}</span></div>
                  <div style={{ ...s.summaryRow, borderTop: `1px solid ${t.border}`, marginTop: 16, paddingTop: 16, fontWeight: 900, color: t.textPrimary, fontSize: 20 }}>
                    <span>Total</span><span>${(cartTotal * 1.08).toFixed(2)}</span></div>
                  <button style={s.checkoutBtn} onClick={() => notify("🎉 Order Confirmed!")}>Pay Now</button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {quizOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.modalOverlay}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={s.modal}>
              <button onClick={() => setQuizOpen(false)} style={s.modalClose}>✕</button>
              <h2 style={{ fontWeight: 900, marginBottom: 12 }}>AI Style Quiz</h2>
              {quizStep === 0 ? (
                <div>
                  <p style={{ color: t.textSecondary, marginBottom: 24 }}>What defines your ideal workspace?</p>
                  <div style={s.quizGrid}>
                    {["Minimalist", "High-Tech", "Cozy", "Productive"].map(o => <button key={o} onClick={() => setQuizStep(1)} style={s.quizBtn}>{o}</button>)}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ fontSize: 48, marginBottom: 20 }}>🧠</motion.div>
                   <h3>AI is generating your profile...</h3>
                   <button onClick={() => setQuizOpen(false)} style={{ ...s.heroBtnPrimary, marginTop: 24 }}>See Results</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.modalOverlay} onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={s.modal} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedProduct(null)} style={s.modalClose}>✕</button>
              <div style={s.modalImgOuter}>
                 {!imgLoaded[`modal-${selectedProduct.id}`] && <Shimmer />}
                 <img src={selectedProduct.img} alt="" style={{ ...s.modalImg, display: imgLoaded[`modal-${selectedProduct.id}`] ? "block" : "none" }} onLoad={() => setImgLoaded(prev => ({ ...prev, [`modal-${selectedProduct.id}`]: true }))} />
              </div>
              <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 8 }}>{selectedProduct.name}</h2>
              <div style={s.sentimentBox}>
                <span style={{ fontSize: 11, fontWeight: 900, color: t.primary }}>🤖 AI SENTIMENT</span>
                <p style={{ fontSize: 14, marginTop: 4 }}>"Customers love the <strong>ergonomic design</strong> and <strong>premium feel</strong> of this item. Highly recommended for daily use!"</p>
              </div>
              <p style={{ color: t.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>{selectedProduct.desc}</p>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>${selectedProduct.price}</div>
              <button style={{ ...s.heroBtnPrimary, width: "100%" }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── THEMES ──────────────────────────────────────────────────────────────────
const lightTheme = { primary: "#4F46E5", bg: "#F8FAFC", surface: "#FFFFFF", textPrimary: "#0F172A", textSecondary: "#64748B", border: "#E2E8F0" };
const darkTheme = { primary: "#818CF8", bg: "#020617", surface: "#0F172A", textPrimary: "#F8FAFC", textSecondary: "#94A3B8", border: "#1E293B" };

// ── STYLES ────────────────────────────────────────────────────────────────────
const getStyles = (t) => ({
  root: { minHeight: "100vh", background: t.bg, color: t.textPrimary, fontFamily: "'Inter', sans-serif" },
  notif: { position: "fixed", top: 80, right: 20, zIndex: 1000, background: t.primary, color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 800, boxShadow: "0 10px 15px rgb(0 0 0 / 0.2)" },
  
  nav: { position: "sticky", top: 0, zIndex: 100, background: t.surface + "cc", backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}` },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  logoIcon: { fontSize: 24, padding: "4px", background: t.bg, borderRadius: 8 },
  logoText: { fontSize: 24, fontWeight: 900, letterSpacing: -1 },
  navLinks: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: t.textSecondary, padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13.5 },
  navBtnActive: { background: t.bg, color: t.textPrimary, border: `1px solid ${t.border}` },
  themeToggle: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 800 },
  aiBtn: { background: t.primary, color: "#fff", border: "none", padding: "8px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 13.5 },

  aiPanel: { position: "fixed", right: 20, bottom: 20, width: 350, height: 500, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 28, zIndex: 200, display: "flex", flexDirection: "column", boxShadow: "0 25px 30px -10px rgb(0 0 0 / 0.15)" },
  aiHeader: { padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", fontWeight: 900, color: t.primary },
  aiClose: { background: "none", border: "none", color: t.textSecondary, fontSize: 18, cursor: "pointer" },
  aiBody: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 },
  aiMsg: { display: "flex", gap: 8 },
  aiMsgUser: { flexDirection: "row-reverse" },
  aiMsgBubble: { maxWidth: "85%", padding: "12px 16px", borderRadius: 20, fontSize: 13.5, lineHeight: 1.5 },
  aiMsgBubbleUser: { background: t.primary, color: "#fff" },
  aiMsgBubbleBot: { background: t.bg, border: `1px solid ${t.border}` },
  aiFooter: { padding: "12px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 8 },
  aiInput: { flex: 1, background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 12, padding: "10px 14px", outline: "none" },
  aiSend: { background: t.primary, color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px" },

  content: { maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" },
  hero: { position: "relative", minHeight: 520, borderRadius: 52, margin: "40px 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  heroSlider: { display: "flex", width: "300%", height: "100%", position: "absolute", inset: 0, zIndex: 0, transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)" },
  heroSlide: { width: "33.333%", height: "100%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, background: `linear-gradient(${t.surface}99, ${t.surface}ee)`, zIndex: 1 },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700 },
  heroTag: { display: "inline-block", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 24, padding: "6px 18px", fontSize: 11, fontWeight: 900, color: t.primary, marginBottom: 20 },
  heroTitle: { fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: -5, margin: "0 0 24px" },
  heroGrad: { background: `linear-gradient(135deg, ${t.primary}, #F43F5E)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroBtns: { display: "flex", gap: 12, justifyContent: "center" },
  heroBtnPrimary: { background: t.textPrimary, color: t.bg, border: "none", padding: "16px 36px", borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: "pointer" },
  heroBtnSecondary: { background: "none", border: `2px solid ${t.border}`, color: t.textPrimary, padding: "16px 36px", borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: "pointer" },

  filterBar: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: "28px", marginBottom: 40, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  filterRow: { display: "flex", gap: 12, marginBottom: 16 },
  semanticSearch: { flex: 1, position: "relative" },
  searchInput: { width: "100%", background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 16, padding: "14px 16px 14px 44px", outline: "none", fontSize: 15 },
  select: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 16, padding: "12px 16px" },
  catRow: { display: "flex", gap: 8, alignItems: "center" },
  catBtn: { background: t.surface, border: `1px solid ${t.border}`, color: t.textSecondary, borderRadius: 100, padding: "8px 20px", fontSize: 14, fontWeight: 700 },
  catBtnActive: { background: t.textPrimary, color: t.bg, borderColor: t.textPrimary },
  priceFilter: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, color: t.textSecondary, fontSize: 13, fontWeight: 700 },
  range: { accentColor: t.primary },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 },
  card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "22px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: 18, left: 18, background: t.primary, color: "#fff", borderRadius: 10, padding: "4px 12px", fontSize: 10.5, fontWeight: 900, zIndex: 5 },
  cardImgOuter: { width: "100%", aspectRatio: "1/1", borderRadius: 24, marginBottom: 18, overflow: "hidden", background: t.bg },
  cardImg: { width: "100%", height: "100%", objectFit: "cover" },
  cardCat: { color: t.primary, fontSize: 10.5, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 },
  cardName: { fontSize: 19, fontWeight: 800, marginBottom: 6 },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18, borderTop: `1px solid ${t.border}`, marginTop: 14 },
  cardPrice: { fontSize: 24, fontWeight: 900 },
  addBtn: { background: t.textPrimary, color: t.bg, border: "none", borderRadius: 14, padding: "10px 20px", fontWeight: 800, fontSize: 14 },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(16px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: t.surface, borderRadius: 44, padding: "44px", maxWidth: 480, width: "100%", position: "relative", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" },
  modalClose: { position: "absolute", top: 28, right: 28, background: t.bg, border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", color: t.textPrimary },
  modalImgOuter: { width: "100%", aspectRatio: "1/1", background: t.bg, borderRadius: 28, marginBottom: 28, overflow: "hidden" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  sentimentBox: { background: t.bg, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px", marginBottom: 20 },

  cartPage: { padding: "40px 0" },
  pageTitle: { fontSize: 40, fontWeight: 900, letterSpacing: -2, marginBottom: 40 },
  cartLayout: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 },
  cartItems: { display: "flex", flexDirection: "column", gap: 16 },
  cartItem: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: "20px", display: "flex", alignItems: "center", gap: 20 },
  cartItemImg: { width: 80, height: 80, borderRadius: 16, objectFit: "cover" },
  cartItemInfo: { flex: 1, fontWeight: 800 },
  qtyControl: { background: t.bg, borderRadius: 12, padding: "6px 12px", display: "flex", gap: 12, alignItems: "center", fontWeight: 800 },
  removeBtn: { background: "none", border: "none", color: t.textSecondary, fontSize: 18 },
  cartSummary: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "32px", position: "sticky", top: 100 },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: 12, color: t.textSecondary, fontWeight: 600 },
  checkoutBtn: { background: t.primary, color: "#fff", border: "none", width: "100%", padding: "18px", borderRadius: 18, fontWeight: 900, fontSize: 17, marginTop: 24, cursor: "pointer" },

  stackGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 },
  stackCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "48px 32px", textAlign: "center", position: "relative", overflow: "hidden" },
  dataPulse: { position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: t.primary, opacity: 0.2 },
  quizGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  quizBtn: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, padding: "20px", borderRadius: 20, fontWeight: 800, cursor: "pointer" },
  empty: { textAlign: "center", padding: "100px 0", fontSize: 24, color: t.textSecondary, fontWeight: 700 },
});
