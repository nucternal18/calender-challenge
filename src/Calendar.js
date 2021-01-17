import { useState } from 'react';
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

export const Calendar = ({ events, startingDate, onClickDate, dates, theme }) => {
    const [selected, setSelected] = useState(startingDate);
    
  return (
    <div className='w-full'>
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
        {dates.map((date) => (
          <div
            key={date.key}
            className={
              theme === 'light'
                ? 'h-16 p-2 border border-1'
                : 'h-16 p-2 overflow-hidden rounded bg-gray-800 shadow-lg'
            }>
            <p
              onClick={() => onClickDate(date.date)}
              className='top-0 left-0 text-xs font-bold cursor-pointer'>
              {date.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
