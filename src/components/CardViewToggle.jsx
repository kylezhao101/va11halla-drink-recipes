import React from 'react';
import '../App.css';

function CardViewToggle({detailedView, setDetailedView}){
    return(
        <div className='flex gap-6 font-body'>
          <p className='text-white'>View</p>
          <div>
            <input
              type='radio'
              id='detailed'
              value='detailed'
              name='cardView'
              className='peer hidden'
              checked={detailedView}
              onChange={() => setDetailedView(true)}
            />
            <label htmlFor='detailed' className='block cursor-pointer text-red-interactive  peer-checked:text-white duration-100'>Detailed</label>
          </div>
          <div>
            <input
              type='radio'
              id='concise'
              value='concise'
              name='cardView'
              className='peer hidden'
              checked={!detailedView}
              onChange={() => setDetailedView(false)}
            />
            <label htmlFor='concise' className='block cursor-pointer text-red-interactive  peer-checked:text-white duration-100'>Concise</label>
          </div>
        </div>
    );
}

export default CardViewToggle;