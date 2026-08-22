import React from 'react';

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconPolitics = () => (
  <svg {...base}>
    <path d="M12 2 3 7v2h18V7L12 2Z" />
    <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
    <path d="M3 21h18" />
  </svg>
);

export const IconEconomy = () => (
  <svg {...base}>
    <path d="M3 17l5-5 4 3 6-7" />
    <path d="M14 8h4v4" />
  </svg>
);

export const IconMilitary = () => (
  <svg {...base}>
    <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />
  </svg>
);

export const IconDiplomacy = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
  </svg>
);

export const IconIntelligence = () => (
  <svg {...base}>
    <circle cx="11" cy="11" r="6" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconStability = () => (
  <svg {...base}>
    <path d="M3 20h18" />
    <path d="M6 20V10M12 20V4M18 20v14" />
  </svg>
);
