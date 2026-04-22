import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-bg-line" />
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-section">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">AURA<span>STORE</span></span>
          </div>
          <p>Elevating your digital and fashion experience since 2024.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Shop</h4>
            <a href="#">Electronics</a>
            <a href="#">Fashion</a>
            <a href="#">Home Essentials</a>
            <a href="#">New Arrivals</a>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Returns & Exchanges</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Sustainability</a>
            <a href="#">Press</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AuraStore. All rights reserved. Built with passion and AI.</p>
      </div>
    </footer>
  );
}
