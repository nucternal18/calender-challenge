import { ImCross } from 'react-icons/im';

const Modal = ({
  selected,
  setSelected,
  selectedDate,
  theme,
  title,
  setTitle,
  dates,
  index,
}) => {
  const onClickDate = (title) => {
    const newDates = [...dates];
    const currentDate = newDates[index];

    if (title) {
      currentDate.event.push({
        key: selectedDate,
        title: title,
      });
    }
    newDates[index] = currentDate;

    localStorage.setItem('dates', JSON.stringify(newDates));
    setTitle('');
    setSelected(!selected);
  };

 
  return (
    <div
      className={
        selected
          ? 'fixed top-0 left-0 flex items-center justify-center  w-full h-screen bg-black opacity-75'
          : 'hidden '
      }>
      <div
        className={
          theme === 'light'
            ? 'w-1/3 bg-white rounded shadow-lg'
            : 'w-1/3 bg-gray-800 rounded shadow-lg'
        }>
        <div className='flex items-center justify-between px-4 py-2 '>
          <h3 className='text-lg font-semibold'>Event Title</h3>
          <button className='' onClick={() => setSelected(!selected)}>
            <ImCross />
          </button>
        </div>

        <div className='p-3'>
          <input
            className='w-full px-1 py-3 text-black border border-gray-400 rounded focus focus:border-none focus:outline-none '
            name='title'
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor='title'
            className='pt-4 pl-3 text-base text-gray-400 '></label>
        </div>
        <div className='flex items-center justify-end p-3 border-t w-100'>
          <button
            className='px-3 py-1 mr-1 text-white bg-red-600 rounded hover:bg-red-700'
            onClick={() => setSelected(!selected)}>
            Cancel
          </button>
          <button
            className='px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700'
            onClick={() => onClickDate(title)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
