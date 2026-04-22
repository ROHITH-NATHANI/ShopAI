import { useState, useCallback } from 'react';

export const useStore = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    notify(`${product.name} added to cart! 🛒`);
  }, [notify]);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQty = useCallback((productId, delta) => {
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const isWishlisted = prev.find(item => item.id === product.id);
      if (isWishlisted) {
        notify(`Removed from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      notify(`Added to wishlist! ❤️`);
      return [...prev, product];
    });
  }, [notify]);

  return {
    cart,
    cartCount: cart.reduce((acc, item) => acc + item.qty, 0),
    cartTotal: cart.reduce((acc, item) => acc + (item.price * item.qty), 0),
    wishlist,
    wishlistCount: wishlist.length,
    notification,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWishlist,
    notify
  };
};
