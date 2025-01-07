import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date('2025-01-07');
      const endDate = new Date('2025-01-31');
      const now = new Date();
      
      // If we're before the start date, count down to start date
      const targetDate = now < startDate ? startDate : 
                        now < endDate ? endDate : null;
      
      if (!targetDate) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const difference = targetDate.getTime() - now.getTime();
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8 flex items-center justify-center">
          <Timer size={40} className="mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold">باقي على إطلاق حملة رمضان</h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'يوم', value: timeLeft.days },
            { label: 'ساعة', value: timeLeft.hours },
            { label: 'دقيقة', value: timeLeft.minutes },
            { label: 'ثانية', value: timeLeft.seconds }
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold mb-2">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base text-purple-200">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xl md:text-2xl text-purple-200 font-light">
          Remaining until Ramadan
        </p>
      </div>
    </div>
  );
}

export default App;