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
                <div className="flex items-center align-middle">
                    Categories
                    <svg
                        className={`ml-2 transition-transform ${isChecked ? '-rotate-90' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="18"
                        height="18"
                    >
                        <path d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </label>
            {isChecked && (
                <div className='grid grid-cols-3 lg:flex lg:flex-col gap-2 mr-10'>
                    <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
                </div>
            )}
        </div>
    );
};

export default TypeDropdown;