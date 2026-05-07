import React, { useState } from 'react';
import { COLORS as C } from '../data/constants';
import { scaleNutrition } from '../utils/nutrition';

/**
 * QuantityModal — Bottom-sheet modal for selecting serving quantity
 * before adding a food item to the log.
 *
 * @prop {object}   item         - { name, d: nutritionData, isIng }
 * @prop {function} onAdd(n,qty) - Called with scaled nutrition and qty
 * @prop {function} onClose      - Called when modal dismissed
 */
export function QuantityModal({ item, onAdd, onClose }) {
  const [qty, setQty] = useState(1);

  if (!item) return null;

  const scaled = scaleNutrition(item.d, qty);

  const adjustQty = (delta) =>
    setQty(q => Math.max(0.25, Math.min(20, parseFloat((q + delta).toFixed(2)))));

  const macros = [
    { icon: '🔥', value: scaled.cal, unit: 'kcal', color: C.accent },
    { icon: '💪', value: scaled.p,   unit: 'P',    color: C.blue   },
    { icon: '🌾', value: scaled.c,   unit: 'C',    color: C.green  },
    { icon: '🫙', value: scaled.f,   unit: 'F',    color: C.purple },
    { icon: '🌿', value: scaled.fi,  unit: 'Fi',   color: '#86efac'},
  ];

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}
    >
      <div
        style={{ width: '100%', maxWidth: 480, margin: '0 auto', background: C.card, borderRadius: '20px 20px 0 0', padding: '20px 16px 32px', border: `1px solid ${C.border}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 2 }}>{item.name}</div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>{item.d.srv} per serving</div>

        {/* Quantity stepper */}
        <div style={{ background: C.card2, borderRadius: 14, padding: '14px 16px', marginBottom: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, color: C.ml, marginBottom: 10, fontWeight: 600 }}>Quantity (servings)</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, borderRadius: 12, border: `2px solid ${C.accent}44`, overflow: 'hidden' }}>
            <button onClick={() => adjustQty(-0.25)} style={{ background: 'transparent', border: 'none', color: C.ml, cursor: 'pointer', fontSize: 22, padding: '10px 20px', fontWeight: 800 }}>−</button>
            <input
              type="number"
              value={qty}
              min="0.25"
              step="0.25"
              onChange={e => { const v = parseFloat(e.target.value); if (v > 0 && v <= 20) setQty(v); }}
              style={{ width: 80, background: 'transparent', border: 'none', color: C.accent, fontSize: 22, fontWeight: 800, outline: 'none', textAlign: 'center', padding: '10px 0' }}
            />
            <button onClick={() => adjustQty(0.25)} style={{ background: 'transparent', border: 'none', color: C.ml, cursor: 'pointer', fontSize: 22, padding: '10px 20px', fontWeight: 800 }}>+</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 10, color: C.muted, marginTop: 6 }}>{qty} × {item.d.srv}</div>
        </div>

        {/* Scaled macros */}
        <div style={{ background: C.card2, borderRadius: 12, padding: '12px 14px', marginBottom: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, color: C.ml, marginBottom: 8, fontWeight: 600 }}>
            Total for {qty} serving{qty !== 1 ? 's' : ''}
          </div>
          <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            {macros.map(({ icon, value, unit, color }) => (
              <div key={unit} style={{ flex: 1, padding: '8px 4px', textAlign: 'center', borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 13, fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: 8, color: C.muted }}>{icon}{unit}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 6, textAlign: 'center' }}>🧂 Sodium: {scaled.na}mg</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, color: C.ml, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Cancel
          </button>
          <button
            onClick={() => onAdd(scaled, qty)}
            style={{ flex: 2, background: `linear-gradient(135deg, ${C.accent}, ${C.yellow})`, border: 'none', borderRadius: 10, padding: 12, color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
          >
            + Add to Log
          </button>
        </div>
      </div>
    </div>
  );
}
