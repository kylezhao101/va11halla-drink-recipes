function SortToggle({ selectedSort, setSelectedSort }) {
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'flavour', label: 'Flavour' }
  ];

  return (
    <div className='flex gap-6 font-body'>
      <p className='text-white'>Sort</p>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type='radio'
            id={option.value}
            value={option.value}
            name='sort'
            className='peer hidden'
            checked={selectedSort === option.value}
            onChange={() => setSelectedSort(option.value)}
          />
          <label
            htmlFor={option.value}
            className={`block cursor-pointer text-red-interactive peer-checked:text-white duration-100`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default SortToggle;