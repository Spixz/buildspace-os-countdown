
import { useState, useEffect } from 'react';

interface CountdownState {
  days: number;
  fraction: string;
}

const MS_IN_SECOND = 1000;
const MS_IN_DAY = MS_IN_SECOND * 60 * 60 * 24;

export const useDemoDayCountdown = (targetDate: Date): CountdownState => {
  const calculateTimeLeft = (): CountdownState => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, fraction: '000000' };
    }

    const totalDays = difference / MS_IN_DAY;
    const fullDays = Math.floor(totalDays);
    const fractionalDay = totalDays - fullDays;
    
    // Format fraction to 6 decimal places, removing the leading "0."
    const fractionString = fractionalDay.toFixed(6).substring(2);

    return {
      days: fullDays,
      fraction: fractionString,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownState>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 50); // Update frequently for smooth fraction animation

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return timeLeft;
};
