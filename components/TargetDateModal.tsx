
import React, { useState, useEffect, useCallback } from 'react';

interface TargetDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTargetDate: Date) => void;
  message: string;
  onMessageChange: (newMessage: string) => void;
  currentTarget: Date;
}

// Helper to format date to YYYY-MM-DD
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to format time to HH:MM
const formatTimeForInput = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const TargetDateModal: React.FC<TargetDateModalProps> = ({ isOpen, onClose, onSave, currentTarget, message, onMessageChange }) => {
  const [dateInput, setDateInput] = useState<string>(formatDateForInput(currentTarget));
  const [timeInput, setTimeInput] = useState<string>(formatTimeForInput(currentTarget));

  useEffect(() => {
    setDateInput(formatDateForInput(currentTarget));
    setTimeInput(formatTimeForInput(currentTarget));
  }, [currentTarget, isOpen]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [year, month, day] = dateInput.split('-').map(Number);
    const [hours, minutes] = timeInput.split(':').map(Number);
    
    // Create new date in local timezone based on input
    // Month is 0-indexed for Date constructor
    const newTargetDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
    
    if (!isNaN(newTargetDate.getTime())) {
      onSave(newTargetDate);
    } else {
      console.error("Invalid date or time input");
      // Optionally, show an error message to the user
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);


  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-[#0f0f0f] p-6 md:p-8 rounded-md shadow-2xl border border-white/20 w-full max-w-md"
        style={{ fontFamily: "'Apple II Pro Regular', serif" }} // Apply pixel font
      >
        <h2 id="modal-title" className="text-2xl mb-6 text-white text-center">Set Target Date & Time</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="target-date" className="block text-sm text-white/80 mb-1">Date:</label>
            <input
              type="date"
              id="target-date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              required
              className="w-full p-3 bg-black/50 border border-white/30 rounded text-white focus:ring-2 focus:ring-white/50 outline-none appearance-none"
              style={{ colorScheme: 'dark' }} // Improves date picker appearance in dark mode
            />
          </div>
          <div>
            <label htmlFor="target-time" className="block text-sm text-white/80 mb-1">Time (Local):</label>
            <input
              type="time"
              id="target-time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              required
              className="w-full p-3 bg-black/50 border border-white/30 rounded text-white focus:ring-2 focus:ring-white/50 outline-none appearance-none"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-white/80 mb-1">Message:</label>
            <input
              type="text"
              id="message"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              className="w-full p-3 bg-black/50 border border-white/30 rounded text-white focus:ring-2 focus:ring-white/50 outline-none"
              placeholder="Enter message below timer"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-white/30 text-white/80 rounded hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black rounded hover:bg-white/80 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
