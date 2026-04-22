import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Heart } from 'lucide-react';
import './Header.css';

export default function Header({ cartCount, wishlistCount, onSearch, currentCategory, setCategory, categories }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="header-inner">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">AURA<span>STORE</span></span>
          </div>

          {/* Location */}
          <div className="location-section hide-mobile">
            <MapPin size={18} className="icon-gold" />
            <div className="location-info">
              <span className="label">Deliver to</span>
              <span className="value">New York 10001</span>
            </div>
          </div>

          {/* Search Bar */}
          <form className="search-section" onSubmit={handleSearchSubmit}>
            <div className="category-select">
              <span>All</span>
              <ChevronDown size={14} />
            </div>
            <input 
              type="text" 
              placeholder="Search premium products..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <Search size={20} />
            </button>
          </form>

          {/* User Actions */}
          <div className="header-actions">
            <div className="action-item hide-mobile">
              <span className="label">Hello, Sign in</span>
              <span className="value">Account <ChevronDown size={14} /></span>
            </div>

            <div className="action-item hide-mobile">
              <span className="label">Returns</span>
              <span className="value">& Orders</span>
            </div>

            <button className="action-btn wishlist-link">
              <Heart size={24} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>

            <button className="action-btn cart-link">
              <ShoppingCart size={24} />
              <span className="badge">{cartCount}</span>
              <span className="cart-text hide-mobile">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="sub-nav">
        <div className="nav-inner">
          <button className="nav-item menu-btn">
            <Menu size={20} />
            <span>All</span>
          </button>
          <div className="nav-links">
            {categories.slice(1, 6).map(cat => (
              <button 
                key={cat} 
                className={`nav-link ${currentCategory === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
            <button className="nav-link highlight">Today's Deals</button>
            <button className="nav-link">Customer Service</button>
            <button className="nav-link">Registry</button>
            <button className="nav-link">Gift Cards</button>
            <button className="nav-link">Sell</button>
          </div>
          <div className="nav-promo hide-mobile">
            <span>Premium Delivery for 30 days</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
