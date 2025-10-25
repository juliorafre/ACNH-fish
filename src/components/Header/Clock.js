import React, { useState, useEffect } from 'react';

const Clock = () => {
  const initialState = {
    time: '00:00',
    date: '01 de Ene Lun.',
  };

  const [state, setState] = useState(initialState);

  function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function setTimeInHTML() {
    const now = new Date();

    // Format time as HH:mm
    const currentTime = new Intl.DateTimeFormat('es', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    // Format month name
    const currentYear = new Intl.DateTimeFormat('es', {
      month: 'long',
    }).format(now);

    // Get day number
    const currentDay = now.getDate();

    // Format day name
    const currentDayName = new Intl.DateTimeFormat('es', {
      weekday: 'short',
    }).format(now);

    setState({
      time: currentTime,
      date: `${currentDay} de ${toCapitalize(currentYear)} ${toCapitalize(
        currentDayName
      )}`,
    });
  }

  useEffect(() => {
    setTimeInHTML();
    const intervalFunc = setInterval(setTimeInHTML, 1000);
    return () => {
      clearInterval(intervalFunc);
    };
  }, []);

  return (
    <div className="clock">
      <div className="flex flex-col justify-center items-center">
        <p id="time" className="time font-bold text-xl">
          {state.time}
        </p>
        <hr className="border-2 mb-1 border-solid border-black w-full rounded-full" />
        <p id="date" className="date font-bold text-sm">
          {state.date}
        </p>
      </div>
    </div>
  );
};

export default Clock;
