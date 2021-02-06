import {useEffect, useState} from 'react';
import Calendar from './Calendar';
import { useDarkMode } from './hooks/useDarkMode';

const dayArr = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const App = () => {
  const today = new Date();

  const [theme, toggleTheme] = useDarkMode();
  const [dates, setDates] = useState([]);
    const [calendar, setCalendar] = useState({
      day: today.getDay(),
      month: today.getMonth(),
      year: today.getFullYear(),
    });
  
  //  const getFirstWeekdayOfMonth = (month, year) => {
  //    return new Date(year, month, 1).getDay();
  //  };




  const getDatesForMonth = () => {
    // Get the first day of the month
    let startOfMonth = new Date(calendar.year, calendar.month).getDay();
    // Get the total number of days in the current month
    let datesInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();
    // Get the total number of days in the previous month
    let prevNumOfDays = new Date(calendar.year, calendar.month, 0).getDate();
    let dates = [];

    for (let i = 1; i <= startOfMonth; i++) {
      const prevMonthDate = prevNumOfDays - startOfMonth + i;
      const key = new Date(
        calendar.year,
        calendar.month - 1,
        prevMonthDate
      ).toLocaleString();
      dates.push({ key: key, date: prevMonthDate, events: [] });
    }

    for (let j = 1; j <= datesInMonth; j++) {
      const key = new Date(calendar.year, calendar.month, j).toLocaleString();
      if (
        j === today.getDate() &&
        calendar.month === today.getMonth() &&
        calendar.year === today.getFullYear() &&
        calendar.day === dayArr[today.getDay()]
      ) {
        dates.push({
          key: key,
          date: j,
          day: dayArr[new Date(calendar.year, calendar.month, j).getDay()],
          month: calendar.month,
          year: calendar.year,
          event: []
        });
      } else {
        dates.push({
          key: key,
          date: j,
          day: dayArr[new Date(calendar.year, calendar.month, j).getDay()],
          month: calendar.month,
          year: calendar.year,
          event: [],
        });
      }
    }
    setDates(dates);
    localStorage.setItem('dates', JSON.stringify(dates))
  };

   useEffect(() => {
     getDatesForMonth();
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
