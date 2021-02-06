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

const Calendar = ({ startingDate, theme, setCalendar, calendar, dates, setDates }) => {
  const [selected, setSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startingDate);
  const [index, setIndex] = useState(0)
  const [monthlyDates, setMonthlyDates] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const date = localStorage.getItem('dates');
    if (date) {
      const parsedJSON = JSON.parse(date);
      setMonthlyDates(parsedJSON);
    }
  }, [selected, setDates]);

  const openModal = (date, i) => {
    setIndex(i)
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
        {monthlyDates.map((d, i) => {
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
