import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Payment({ cart, total, theme, onPaymentComplete }) {
  const [submitting, setSubmitting] = useState(false);
  const t = theme;
  
  const s = {
    container: { maxWidth: 1000, margin: '40px auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, padding: '0 20px' },
    sectionTitle: { fontSize: 24, fontWeight: 900, marginBottom: 24, letterSpacing: -1 },
    card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: 32 },
    input: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 12, padding: '12px 14px', outline: 'none', width: '100%' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    label: { fontSize: 12, fontWeight: 700, color: t.textSecondary, marginBottom: 6, display: 'block' },
    summaryCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: 32, position: 'sticky', top: 100 },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: t.textSecondary, fontSize: 14 },
    totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 24, borderTop: `1px solid ${t.border}`, fontWeight: 900, fontSize: 20 },
    payBtn: { background: t.primary, color: '#fff', border: 'none', width: '100%', padding: '18px', borderRadius: 16, fontWeight: 900, fontSize: 17, marginTop: 32, cursor: 'pointer' },
    
    // Credit Card Design
    cc: { width: '100%', aspectRatio: '1.6/1', background: `linear-gradient(135deg, ${t.primary}, #6366f1)`, borderRadius: 24, padding: 28, position: 'relative', color: '#fff', marginBottom: 32, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' },
    ccChip: { width: 45, height: 35, background: '#fbbf24', borderRadius: 6, marginBottom: 24 },
    ccNumber: { fontSize: 22, letterSpacing: 4, fontWeight: 700, marginBottom: 24, opacity: 0.9 },
    ccFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
    ccLabel: { fontSize: 10, textTransform: 'uppercase', opacity: 0.7, marginBottom: 4 },
    ccValue: { fontSize: 14, fontWeight: 600 }
  };

  const handlePay = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div style={s.container}>
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <h2 style={s.sectionTitle}>Secure Checkout</h2>
        
        <div style={s.cc}>
           <div style={s.ccChip} />
           <div style={s.ccNumber}>•••• •••• •••• 4242</div>
           <div style={s.ccFlex}>
             <div>
               <div style={s.ccLabel}>Card Holder</div>
               <div style={s.ccValue}>SHOPPER AI</div>
             </div>
             <div style={{ textAlign: 'right' }}>
               <div style={s.ccLabel}>Expires</div>
               <div style={s.ccValue}>12/28</div>
             </div>
           </div>
           <div style={{ position: 'absolute', right: 28, top: 28, fontSize: 24, fontWeight: 900, fontStyle: 'italic' }}>VISA</div>
        </div>

        <div style={s.card}>
          <div style={{ marginBottom: 24 }}>
             <label style={s.label}>Card Number</label>
             <input style={s.input} placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
          </div>
          <div style={s.grid2}>
             <div>
               <label style={s.label}>Expiry Date</label>
               <input style={s.input} placeholder="MM/YY" defaultValue="12/28" />
             </div>
             <div>
               <label style={s.label}>CVC</label>
               <input style={s.input} placeholder="123" defaultValue="123" />
             </div>
          </div>
          <div style={{ marginTop: 24 }}>
             <label style={s.label}>Shipping Address</label>
             <textarea style={{ ...s.input, minHeight: 80, resize: 'none' }} placeholder="123 AI Street, Tech City" />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <div style={s.summaryCard}>
          <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: t.textSecondary }}>{item.name} x{item.qty}</span>
                <span style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div style={s.summaryRow}><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
          <div style={s.summaryRow}><span>Shipping</span><span>Free</span></div>
          <div style={s.summaryRow}><span>Tax (8%)</span><span>₹{(total * 0.08).toFixed(2)}</span></div>
          
          <div style={s.totalRow}>
             <span>Total</span><span>₹{(total * 1.08).toFixed(2)}</span>
          </div>

          <button style={s.payBtn} onClick={handlePay} disabled={submitting}>
            {submitting ? 'Processing...' : `Pay ₹${(total * 1.08).toFixed(2)}`}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: t.textSecondary }}>
            🔒 Secured by ShopAI Enterprise Encryption
          </div>
        </div>
      </motion.div>
    </div>
  );
}
