import React, { useState } from 'react';
import Hero from '../features/shop/Hero';
import ProductCard from '../features/products/ProductCard';
import { PRODUCTS } from '../data/products';
import { Filter, Search as SearchIcon, Zap, Layers, ShoppingBag, X } from 'lucide-react';
import { Button } from '../components/ui';
import './Home.css';

export default function Home({ onAddToCart, onToggleWishlist, wishlist, onOpenDetails }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="home-page">
      <Hero />
      
      <section className="store-container">
        <div className="store-header">
          <div className="store-title-section">
            <h2 className="section-title">
              {activeCategory === 'All' ? 'Premium Collection' : `Latest in ${activeCategory}`}
            </h2>
            <p className="section-subtitle">Curated excellence for the modern lifestyle.</p>
          </div>
          
          <div className="store-filters">
            <Button variant="secondary">
              <Filter size={18} />
              <span>Filters</span>
            </Button>
            <div className="sort-select glass">
              <span>Featured</span>
              <X size={14} />
            </div>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some(item => item.id === product.id)}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <SearchIcon size={48} className="empty-icon" />
            <h3>No products found</h3>
            <p>We couldn't find any products matching your current filters.</p>
            <Button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>
              View All Collection
            </Button>
          </div>
        )}
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card glass">
            <Zap className="feature-icon" />
            <h4>Instant Delivery</h4>
            <p>Get your favorite products delivered in under 24 hours.</p>
          </div>
          <div className="feature-card glass">
            <Layers className="feature-icon" />
            <h4>Quality Guaranteed</h4>
            <p>Each item is hand-inspected for premium craftsmanship.</p>
          </div>
          <div className="feature-card glass">
            <ShoppingBag className="feature-icon" />
            <h4>Secure Checkout</h4>
            <p>Enterprise-grade security for all your transactions.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
