import React from 'react';
import '../App.css';

function SortToggle({selectedSort, setSelectedSort}){
    return(
        <div className='flex gap-6 font-body'>
          <p className='text-white'>Sort/group by</p>
          <div>
            <input
              type='radio'
              id='name'
              value='name'
              name='sort'
              className='peer hidden'
              onChange={() => setSelectedSort('name')}
            />
            <label htmlFor='name' className='block cursor-pointer text-red-interactive peer-checked:text-white duration-100'>Name</label>
          </div>
          <div>
            <input
              type='radio'
              id='price'
              value='price'
              name='sort'
              className='peer hidden'
              onChange={() => setSelectedSort('price')}
            />
            <label htmlFor='price' className='block cursor-pointer text-red-interactive  peer-checked:text-white duration-100'>Price</label>
          </div>
          <div>
            <input
              type='radio'
              id='flavour'
              value='flavour'
              name='sort'
              className='peer hidden'
              onChange={() => setSelectedSort('flavour')}
            />
            <label htmlFor='flavour' className='block cursor-pointer text-red-interactive  peer-checked:text-white duration-100'>Flavour</label>
          </div>
        </div>
    );
}

export default SortToggle;