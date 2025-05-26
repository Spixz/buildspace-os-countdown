
import React from 'react';

interface CountdownDisplayProps {
  days: number;
  fraction: string;
  onOpenModal: () => void;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ days, fraction, onOpenModal }) => {
  return (
    <div 
      className="text-white text-center select-none cursor-pointer pointer-events-auto"
      onClick={onOpenModal}
      style={{ letterSpacing: '-0.75rem' }} 
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenModal()}
      aria-label="Open target date selector"
    >
      <span 
        className="text-[84px] font-bold leading-none" 
      >
        {days}
      </span>
      <span 
        className="text-[24px] leading-none relative"
        style={{ letterSpacing: '0rem', top: '-0.2em' }} 
      >
        .{fraction}
      </span>
    </div>
  );
};
