import React from 'react';
import '../App.css';

const TypeFilter = ({ selectedTypes = [], setSelectedTypes }) => {
    const types = [
        "Bland", "Burning", "Classic", "Classy", "Girly", "Happy", "Manly", "Promo", "Sobering", "Soft", "Strong", "Vintage"
    ];

    const handleTypeChange = (type) => {
        if (selectedTypes.includes(type)) {
            //remove if already in array
            const updatedTypes = selectedTypes.filter(selectedType => selectedType !== type);
            setSelectedTypes(updatedTypes);
        } else {
            //if not in list
            if (selectedTypes.length < 2) { 
                //add to list
                const updatedTypes = [...selectedTypes, type];
                setSelectedTypes(updatedTypes);
            } else {
                //remove oldest from list and element at index 1 to 0
                const updatedTypes = [selectedTypes[1], type];
                setSelectedTypes(updatedTypes);
            }
        }
    };

    return (
        <div className='flex gap-2'>
            {types.map((type) => (
                <div key={type}>
                    <input
                        type='checkbox'
                        id={type}
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className='peer'
                    />
                    <label htmlFor={type} className=''>
                        {type}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default TypeFilter;