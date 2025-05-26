
import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundScreen } from './components/BackgroundScreen';
import { CountdownDisplay } from './components/CountdownDisplay';
import { Logo } from './components/Logo';
import { TargetDateModal } from './components/TargetDateModal';
import { useDemoDayCountdown } from './hooks/useDemoDayCountdown';
import { DEMO_DAY_TARGET_DATE, LOCAL_STORAGE_KEY } from './constants';

const App: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const savedDate = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDate) {
      const parsedDate = new Date(savedDate);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    return DEMO_DAY_TARGET_DATE;
  });

  const { days, fraction } = useDemoDayCountdown(targetDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSaveTargetDate = useCallback((newDate: Date) => {
    setTargetDate(newDate);
    localStorage.setItem(LOCAL_STORAGE_KEY, newDate.toISOString());
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    // Ensure the initial targetDate (if loaded from localStorage) is used for the countdown
    // This effect is mostly to show how one might re-trigger if targetDate was not initially in useDemoDayCountdown
  }, [targetDate]);


  return (
    <div className="relative h-screen w-screen overflow-hidden antialiased">
      <BackgroundScreen
        videoSrc="https://framerusercontent.com/assets/UUaKnrRk67VWHwJzeCwxfsajLU.mp4"
        noiseTextureSrc="https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png"
      />
      
      <div className="absolute top-0 left-0 p-6 md:p-8 z-20">
        <Logo />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <CountdownDisplay days={days} fraction={fraction} onOpenModal={handleOpenModal} />
        <p 
          className="text-white/75 mt-3 pointer-events-none"
          style={{
            fontSize: '18px',
            letterSpacing: '-2.4px',
            lineHeight: '1em',
          }}
        >
          days till demo day
        </p>
      </div>

      {isModalOpen && (
        <TargetDateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTargetDate}
          currentTarget={targetDate}
        />
      )}
    </div>
  );
};

export default App;
