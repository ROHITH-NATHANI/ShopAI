import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AIConcierge from './features/ai/AIConcierge';
import Home from './pages/Home';
import { useStore } from './hooks/useStore';
import { PRODUCTS, CATEGORIES } from './data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button, StarRating } from './components/ui';
import './App.css';

function App() {
  const { 
    cart, cartCount, wishlist, 
    notification, addToCart, toggleWishlist 
  } = useStore();

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="app-root">
      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            className={`notification ${notification.type}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Header 
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        categories={CATEGORIES}
        setCategory={() => {}} // Placeholder until Router or state lifting
        onSearch={() => {}}    // Placeholder until Router or state lifting
      />

      <Home 
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
        onOpenDetails={setSelectedProduct}
      />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="modal-content glass"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-layout">
                <div className="modal-image-sec">
                  <img src={selectedProduct.img} alt={selectedProduct.name} />
                </div>
                <div className="modal-info-sec">
                  <span className="modal-cat">{selectedProduct.category}</span>
                  <h2 className="modal-title">{selectedProduct.name}</h2>
                  
                  <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
                  
                  <div className="modal-price">${selectedProduct.price}</div>
                  <p className="modal-desc">{selectedProduct.desc}</p>
                  
                  <div className="modal-features">
                    <h4>Key Features</h4>
                    <ul>
                      {selectedProduct.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>

                  <div className="modal-actions">
                    <Button variant="primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                      Add to Cart
                    </Button>
                    <Button variant="secondary" onClick={() => toggleWishlist(selectedProduct)}>
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIConcierge products={PRODUCTS} />
      <Footer />
    </div>
  );
}

export default App;
