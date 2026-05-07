import React from 'react';
import { COLORS as C } from '../data/constants';

/**
 * MacroRow — Displays cal/protein/carbs/fat/fiber in a horizontal strip.
 * @prop {number} cal, p, f, c, fi
 * @prop {'sm'|'lg'} size
 */
export function MacroRow({ cal, p, f, c, fi, size = 'sm' }) {
  const big = size === 'lg';
  const macros = [
    { icon: '🔥', value: cal, unit: 'kcal', color: C.accent },
    { icon: '💪', value: p,   unit: 'g P',  color: C.blue   },
    { icon: '🌾', value: c,   unit: 'g C',  color: C.green  },
    { icon: '🫙', value: f,   unit: 'g F',  color: C.purple },
    { icon: '🌿', value: fi,  unit: 'g Fi', color: '#86efac'},
  ];

  return (
    <div style={{ display: 'flex', gap: big ? 14 : 8, flexWrap: 'wrap' }}>
      {macros.map(({ icon, value, unit, color }) => (
        <div key={unit} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: big ? 18 : 13, fontWeight: 800, color }}>
            {Math.round(value * 10) / 10}
          </div>
          <div style={{ fontSize: big ? 9 : 8, color: C.muted }}>
            {icon}{unit}
          </div>
        </div>
      ))}
    </div>
  );
}
