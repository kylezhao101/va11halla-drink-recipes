import React from 'react';
import '../App.css';

function FlavourFilter({ selectedFlavour, setSelectedFlavour }) {
  const flavours = ["All", "Bitter", "Bubbly", "Sour", "Spicy", "Sweet"];

  return (
    <div className='flex gap-3 font-body text-red-interactive'>
      {flavours.map((flavour) => (
        <div key={flavour}>
          <input
            type='radio'
            id={flavour}
            value={flavour}
            name='flavour'
            className='peer hidden'
            onClick={() => setSelectedFlavour(flavour === "All" ? null : flavour)}
          />
          <label
            htmlFor={flavour}
            className='block w-24 p-1 cursor-pointer select-none border-red-interactive border-2 rounded-full hover:bg-red-interactive hover:bg-opacity-20 hover:shadow-red-interactive hover:shadow-md text-center peer-checked:bg-red-interactive peer-checked:text-slate-950 peer-checked:font-bold duration-100'
          >
            {flavour}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FlavourFilter;