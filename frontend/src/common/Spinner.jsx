import React from 'react';
import { colors } from '../theme';

const Spinner = ({ label = 'Loading…' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '0.75rem' }}>
    <style>{`@keyframes wh-spin { to { transform: rotate(360deg); } }`}</style>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: `3px solid ${colors.border}`,
        borderTopColor: colors.accent,
        animation: 'wh-spin 0.7s linear infinite',
      }}
    />
    <span style={{ fontSize: '0.8rem', color: colors.textLo }}>{label}</span>
  </div>
);

export default Spinner;