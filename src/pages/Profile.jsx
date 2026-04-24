import React from 'react';
import { motion } from 'framer-motion';

export default function Profile({ user, onLogout, theme }) {
  const t = theme;
  const s = {
    container: { maxWidth: 800, margin: '60px auto', padding: '0 20px' },
    header: { display: 'flex', alignItems: 'center', gap: 32, marginBottom: 48 },
    avatar: { width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, #ec4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#fff', fontWeight: 900 },
    name: { fontSize: 40, fontWeight: 900, letterSpacing: -2, marginBottom: 4 },
    email: { color: t.textSecondary, fontSize: 16 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48 },
    card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 28, padding: 24 },
    cardTitle: { fontSize: 13, fontWeight: 700, color: t.textSecondary, textTransform: 'uppercase', marginBottom: 8 },
    cardVal: { fontSize: 24, fontWeight: 900 },
    logoutBtn: { background: 'none', border: `1px solid ${t.border}`, color: '#ef4444', padding: '12px 24px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }
  };

  return (
    <div style={s.container}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={s.header}>
        <div style={s.avatar}>{user?.name?.[0] || 'U'}</div>
        <div>
          <h2 style={s.name}>{user?.name}</h2>
          <div style={s.email}>{user?.email}</div>
          <div style={{ marginTop: 12 }}>
            <span style={{ background: t.primary + '22', color: t.primary, padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 900 }}>PREMIUM MEMBER</span>
          </div>
        </div>
      </motion.div>

      <div style={s.grid}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} style={s.card}>
          <div style={s.cardTitle}>Total Orders</div>
          <div style={s.cardVal}>12</div>
        </motion.div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} style={s.card}>
          <div style={s.cardTitle}>Wishlist Items</div>
          <div style={s.cardVal}>5</div>
        </motion.div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} style={s.card}>
          <div style={s.cardTitle}>Member Since</div>
          <div style={s.cardVal}>April 2026</div>
        </motion.div>
      </div>

      <h3 style={{ fontWeight: 800, marginBottom: 24 }}>Account Settings</h3>
      <div style={{ ...s.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <div style={{ fontWeight: 800 }}>Notification Preferences</div>
           <div style={{ fontSize: 13, color: t.textSecondary }}>Personalized AI recommendations enabled</div>
        </div>
        <button style={{ border: 'none', background: t.bg, padding: '8px 16px', borderRadius: 10, fontWeight: 700 }}>Edit</button>
      </div>

      <div style={{ marginTop: 48, borderTop: `1px solid ${t.border}`, paddingTop: 32 }}>
        <button style={s.logoutBtn} onClick={onLogout}>Logout Account</button>
      </div>
    </div>
  );
}
