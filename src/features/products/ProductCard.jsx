import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { StarRating, Button } from '../../components/ui';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onOpenDetails }) {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="product-image-container" onClick={() => onOpenDetails(product)}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="product-image-overlay">
          <Button variant="ghost" className="overlay-btn" onClick={(e) => { e.stopPropagation(); onOpenDetails(product); }}>
            <Eye size={20} />
          </Button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-cat-row">
          <span className="product-category">{product.category}</span>
          <button 
            className={`wish-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        
        <h3 className="product-name" onClick={() => onOpenDetails(product)}>{product.name}</h3>
        
        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="product-bottom">
          <div className="product-price">
            <span className="currency">$</span>
            <span className="amount">{Math.floor(product.price)}</span>
            <span className="decimals">{(product.price % 1).toFixed(2).slice(2)}</span>
          </div>
          
          <Button variant="secondary" size="sm" className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
            <ShoppingCart size={18} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
