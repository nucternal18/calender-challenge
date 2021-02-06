import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Modal from './Modal';

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

// Work your magic here!
const dayArr = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Calendar = ({
  startingDate,
  theme,
  setCalendar,
  calendar,
  dates,
  setDates,
}) => {
  const [selected, setSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startingDate);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
      const getDatesForMonth = () => {
        // Get the first day of the month
        let startOfMonth = new Date(calendar.year, calendar.month).getDay();
        // Get the total number of days in the current month
        let datesInMonth = new Date(
          calendar.year,
          calendar.month + 1,
          0
        ).getDate();
        // Get the total number of days in the previous month
        let prevNumOfDays = new Date(
          calendar.year,
          calendar.month,
          0
        ).getDate();
        let datesArr = [];

        for (let i = 1; i <= startOfMonth; i++) {
          const prevMonthDate = prevNumOfDays - startOfMonth + i;
          const key = new Date(
            calendar.year,
            calendar.month - 1,
            prevMonthDate
          ).toLocaleString();
          datesArr.push({ key: key, date: prevMonthDate, events: [] });
        }

        for (let j = 1; j <= datesInMonth; j++) {
          const key = new Date(
            calendar.year,
            calendar.month,
            j
          ).toLocaleString();
          if (
            j === startingDate.getDate() &&
            calendar.month === startingDate.getMonth() &&
            calendar.year === startingDate.getFullYear() &&
            calendar.day === dayArr[startingDate.getDay()]
          ) {
            datesArr.push({
              key: key,
              date: j,
              day: dayArr[new Date(calendar.year, calendar.month, j).getDay()],
              month: calendar.month,
              year: calendar.year,
              event: [],
            });
          } else {
            datesArr.push({
              key: key,
              date: j,
              day: dayArr[new Date(calendar.year, calendar.month, j).getDay()],
              month: calendar.month,
              year: calendar.year,
              event: [],
            });
          }
        }
        localStorage.setItem('dates', JSON.stringify(datesArr));
      };

    getDatesForMonth();
    
  }, [calendar.day, calendar.month, calendar.year, startingDate]);

  const openModal = (date, i) => {
    setIndex(i);
    setSelectedDate(date);
    setSelected(!selected);
  };

  const onClickNext = () => {
    const date = new Date(calendar.year, calendar.month + 1);
    setCalendar({ month: date.getMonth(), year: date.getFullYear() });
  };

  const onClickPrevious = () => {

    const date = new Date(calendar.year, calendar.month - 1);
    setCalendar({ month: date.getMonth(), year: date.getFullYear() });
  };

  return (
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
      <div className='grid grid-cols-7 gap-2 mb-2'>
        {dayArr.map((day, index) => (
          <div
            key={index}
            className={
              theme === 'light'
                ? ' p-2 border border-1'
                : ' p-2 overflow-hidden rounded bg-gray-800 shadow-lg'
            }>
            <h2>{day}</h2>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {dates.map((d, i) => {
          const { key, month, date, event } = d;
          return (
            <div
              key={key}
              data-active-month={month}
              data-date={date.toString()}
              className={
                theme === 'light'
                  ? 'h-16 p-2 border border-1 rounded shadow-xl'
                  : 'h-16 p-2 overflow-hidden rounded bg-gray-800 shadow-xl'
              }>
              <p
                className='top-0 left-0 text-xs font-bold cursor-pointer'
                onClick={() => openModal(date, i)}>
                {date}
              </p>

              {event?.map((item, index) => {
                const { key, title } = item;

                return (
                  key === date && (
                    <div
                      key={index}
                      className='flex flex-col overscroll-y-auto'>
                      <a
                        href='#!'
                        className='px-1 mb-1 text-xs text-white bg-blue-400 rounded'>
                        {title}
                      </a>
                    </div>
                  )
                );
              })}

              <Modal
                selected={selected}
                setSelected={setSelected}
                selectedDate={selectedDate}
                title={title}
                setTitle={setTitle}
                event={event}
                date={date}
                dates={dates}
                setDates={setDates}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
