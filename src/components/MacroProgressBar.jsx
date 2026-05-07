import React from 'react';
import { COLORS as C } from '../data/constants';

/**
 * MacroProgressBar — Labeled progress bar with over/under indicator.
 * @prop {string} label
 * @prop {number} current
 * @prop {number} goal
 * @prop {string} color
 * @prop {string} unit  - default 'g'
 * @prop {string} icon
 */
export function MacroProgressBar({ label, current, goal, color, unit = 'g', icon }) {
  const pct  = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const over = goal > 0 && current > goal;
  const diff = Math.abs(Math.round(current - goal));

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 12, color: C.ml }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: over ? C.red : color }}>
          {Math.round(current)}
          <span style={{ color: C.muted, fontWeight: 400 }}> / {goal}{unit}</span>
        </span>
      </div>
      <div style={{ height: 6, background: C.card2, borderRadius: 3 }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: over ? C.red : color,
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <div style={{ fontSize: 10, textAlign: 'right', marginTop: 2, color: over ? C.red : C.muted }}>
        {over ? `${diff}${unit} over` : `${diff}${unit} left`}
      </div>
    </div>
  );
}
