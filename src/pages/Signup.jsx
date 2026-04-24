import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Signup({ onSignup, onSwitchToLogin, theme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const resp = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await resp.json();
      if (resp.ok) {
        onSignup(data.user);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Could not connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  const t = theme;
  const s = {
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' },
    card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: '48px', width: '100%', maxWidth: 450, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' },
    title: { fontSize: 32, fontWeight: 900, marginBottom: 8, letterSpacing: -1 },
    subtitle: { color: t.textSecondary, marginBottom: 32, fontSize: 14 },
    form: { display: 'flex', flexDirection: 'column', gap: 20 },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: 8 },
    label: { fontSize: 13, fontWeight: 700, color: t.textSecondary },
    input: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 16, padding: '14px 16px', outline: 'none', transition: 'all 0.2s' },
    button: { background: t.primary, color: '#fff', border: 'none', padding: '16px', borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: 'pointer', marginTop: 12 },
    switch: { marginTop: 24, textAlign: 'center', fontSize: 14, color: t.textSecondary },
    link: { color: t.primary, fontWeight: 800, cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
    error: { background: '#FEE2E2', color: '#B91C1C', padding: '12px 16px', borderRadius: 12, fontSize: 13, marginBottom: 20, border: '1px solid #FECACA' }
  };

  return (
    <div style={s.container}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={s.card}>
        <h2 style={s.title}>Join ShopAI</h2>
        <p style={s.subtitle}>Create your premium account to start shopping.</p>
        
        {error && <div style={s.error}>{error}</div>}
        
        <form style={s.form} onSubmit={handleSubmit}>
          <div style={s.inputGroup}>
            <label style={s.label}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" style={s.input} required />
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" style={s.input} required />
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Create Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={s.input} required />
          </div>
          <button type="submit" style={s.button} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div style={s.switch}>
          Already have an account? <button onClick={onSwitchToLogin} style={s.link}>Sign In</button>
        </div>
      </motion.div>
    </div>
  );
}
