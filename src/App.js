import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { useDarkMode } from './hooks/useDarkMode';

export const App = () => {
  const today = new Date();

  const [theme, toggleTheme] = useDarkMode();
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    day: today.getDay(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  useEffect(() => {
    const date = localStorage.getItem('dates');
    if (date) {
      const parsedJSON = JSON.parse(date);
      setDates(parsedJSON);
    }
  }, [calendar]);

  return (
    <div
      className={
        theme === 'light'
          ? 'h-screen box-border bg-white text-black py-12'
          : 'h-screen box-border bg-gray-800 text-white py-12'
      }>
      <div className='container flex flex-col items-center justify-center mx-auto '>
        <div className='relative inline-block w-10 mb-4 align-middle transition duration-200 ease-in select-none'>
          <button
            type='button'
            className={
              theme === 'light'
                ? 'px-4 py-2 font-bold text-black border-2 border-green-400 uppercase bg-transparent rounded hover:bg-blue-dark focus:outline-none'
                : 'px-4 py-2 font-bold text-white bg-green-400 rounded uppercase hover:bg-blue-dark focus:outline-none'
            }
            onClick={toggleTheme}>
            {theme}
          </button>
        </div>

        <Calendar
          startingDate={today}
          calendar={calendar}
          dates={dates}
          theme={theme}
          setDates={setDates}
          setCalendar={setCalendar}
        />
      </div>
    </div>
  );
};
