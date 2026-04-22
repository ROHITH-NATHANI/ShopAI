import React from 'react';
import './ui.css';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span className={`badge-ui badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

export const StarRating = ({ rating, reviews, size = 14 }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`} style={{ fontSize: size }}>
        ★
      </span>
    );
  }
  return (
    <div className="star-rating">
      <div className="stars-row">{stars}</div>
      {reviews !== undefined && <span className="reviews-text">({reviews.toLocaleString()})</span>}
    </div>
  );
};
