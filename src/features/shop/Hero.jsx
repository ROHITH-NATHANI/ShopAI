import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui';
import './Hero.css';

const SLIDES = [
  {
    id: 1,
    title: "The Era of Sound",
    subtitle: "Aura Pro Wireless",
    description: "Experience sound like never before with 40-hour battery and ANC.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426ff472b?auto=format&fit=crop&q=80&w=2000",
    cta: "Shop Electronics",
    color: "#f59e0b"
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Luxury Watch Collection",
    description: "Crafted with precision, designed for those who value every second.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=2000",
    cta: "Shop Fashion",
    color: "#38bdf8"
  },
  {
    id: 3,
    title: "Pure Mountain Tea",
    subtitle: "Organic Zen Series",
    description: "Hand-picked organic leaves for a truly tranquil experience.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=2000",
    cta: "Explore Food",
    color: "#10b981"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <motion.span 
              className="hero-subtitle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: SLIDES[currentSlide].color }}
            >
              {SLIDES[currentSlide].subtitle}
            </motion.span>
            <motion.h1 
              className="hero-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {SLIDES[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="hero-desc"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {SLIDES[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button size="lg" className="hero-cta-btn">
                {SLIDES[currentSlide].cta}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-controls">
        <button onClick={prevSlide} className="hero-ctrl-btn"><ChevronLeft size={32} /></button>
        <button onClick={nextSlide} className="hero-ctrl-btn"><ChevronRight size={32} /></button>
      </div>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <div 
            key={i} 
            className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
