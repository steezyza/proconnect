
import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  color?: 'teal' | 'gold' | 'coral';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className = 'h-2', color = 'teal' }) => {
  const colorClasses = {
    teal: 'bg-teal',
    gold: 'bg-gold',
    coral: 'bg-coral',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className={`${colorClasses[color]} h-full rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
