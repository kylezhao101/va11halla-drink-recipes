import React, { useState } from 'react';
import TypeFilter from './TypeFilter';
import '../App.css';

const TypeDropdown = ({ selectedTypes, setSelectedTypes }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className='lg:hidden'>
            <label className="text-red-interactive text-lg font-body">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                    className="peer hidden"
                />
                Categories
            </label>
            {isChecked && (
                <div className='grid grid-cols-3 lg:flex lg:flex-col gap-2 mr-20'>
                    <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
                </div>
            )}
        </div>
    );
};

export default TypeDropdown;