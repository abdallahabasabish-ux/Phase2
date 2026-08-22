import React from 'react';

interface StatBarProps {
  icon: React.ReactNode;
  label: string;
  value: number; // 0-100
  displayValue?: string;
}

export const StatBar: React.FC<StatBarProps> = ({ icon, label, value, displayValue }) => (
  <div className="stat-card">
    <div className="stat-label">
      {icon}
      <span>{label}</span>
    </div>
    <div className="stat-value">{displayValue ?? value}</div>
    <div className="stat-bar-track">
      <div className="stat-bar-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  </div>
);
