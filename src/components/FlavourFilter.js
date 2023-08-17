import React from 'react';
import '../App.css';

function FlavourFilter({ selectedFlavour, setSelectedFlavour }) {
  const flavours = ["All", "Bitter", "Bubbly", "Sour", "Spicy", "Sweet"];

  return (
    <div className='flex font-body text-red-interactive'>
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
            className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'
          >
            {flavour}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FlavourFilter;