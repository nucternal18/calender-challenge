import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Calendar } from './Calendar';
import { useDarkMode } from './hooks/useDarkMode';

const fakeEvents = [
  {
    date: new Date(),
    title: 'Trash day!',
  },
  {
    date: new Date(),
    title: 'Other stuff',
  },
];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const App = () => {
  const today = new Date();
  const [events] = useState(fakeEvents);
  const [theme, toggleTheme] = useDarkMode();
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const getDatesForMonth = () => {
    // Get the first day of the month
    let startOfMonth = new Date(calendar.year, calendar.month).getDay();
    // Get the total number of days in the current month
    let numOfDays = new Date(calendar.year, calendar.month + 1, 0).getDate();
    // Get the total number of days in the previous month
    let prevNumOfDays = new Date(calendar.year, calendar.month, 0).getDate();
    let dates = [];

    for (let i = 1; i <= startOfMonth; i++) {
      // Calculates the date value
      const prevMonthDate = prevNumOfDays - startOfMonth + i;
      const key = new Date(
        calendar.year,
        calendar.month - 1,
        prevMonthDate
      ).toLocaleString();
      dates.push({ key: key, date: prevMonthDate, monthClass: 'prev' });
    }

    for (let i = 1; i <= numOfDays; i++) {
      const key = new Date(calendar.year, calendar.month, i).toLocaleString();
      if (
        i === today.getDate() &&
        calendar.month === today.getMonth() &&
        calendar.year === today.getFullYear()
      ) {
        dates.push({
          key: key,
          date: i,
          monthClass: 'current',
          todayClass: 'today',
        });
      } else {
        dates.push({ key: key, date: i, monthClass: 'current' });
      }
    }

    const gridsize = 42;
    // If there is space left over in the grid, then show the dates for the next month
    if (dates.length < gridsize) {
      const count = gridsize - dates.length;
      for (var i = 1; i <= count; i++) {
        const key = new Date(
          calendar.year,
          calendar.month + 1,
          i
        ).toLocaleString();
        dates.push({ key: key, date: i, monthClass: 'next' });
      }
    }

    setDates(dates);
  };

  useEffect(() => {
    getDatesForMonth();
  }, [calendar]);

  const onClickNext = () => {
    const date = new Date(calendar.year, calendar.month + 1);
    setCalendar({ month: date.getMonth(), year: date.getFullYear() });
  };

  const onClickPrevious = () => {
    const date = new Date(calendar.year, calendar.month - 1);
    setCalendar({ month: date.getMonth(), year: date.getFullYear() });
  };

  const onClickDate = (selectedDate) => {
    alert(`User clicked: ${selectedDate}`);
  };

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
        <div
          className={
            theme === 'light'
              ? 'px-4 py-2 overflow-hidden rounded bg-transparent shadow-lg '
              : 'px-4 py-2 overflow-hidden rounded bg-gray-900 shadow-lg '
          }
          style={{ width: '900px' }}>
          <div className='flex flex-row items-center justify-between px-2 py-4'>
            <button
              type='button'
              onClick={onClickPrevious}
              className='flex items-center text-lg font-bold border-none focus:outline-none hover:text-blue-300'>
              <FaArrowLeft className='mr-1' /> Previous
            </button>
            <div>
              <h2 className='mb-2 text-2xl font-bold uppercase '>
                {months[calendar.month]} {calendar.year}
              </h2>
            </div>
            <button
              type='button'
              onClick={onClickNext}
              className='flex items-center text-lg font-bold border-none focus:outline-none hover:text-blue-300'>
              Next <FaArrowRight className='ml-1' />
            </button>
          </div>
                  <Calendar
                      theme={theme}
            events={events}
            dates={dates}
            onClickDate={onClickDate}
            startingDate={today}
          />
        </div>
      </div>
    </div>
  );
};
