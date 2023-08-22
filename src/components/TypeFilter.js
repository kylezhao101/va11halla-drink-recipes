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

    const columnCount = 3;
    const typesPerColumn = Math.ceil(types.length / columnCount);

    const typeColumns = Array.from({ length: columnCount }, (_, columnIndex) => {
        const startIndex = columnIndex * typesPerColumn;
        const endIndex = startIndex + typesPerColumn;
        return types.slice(startIndex, endIndex);
    });

    return (
        <div className='grid grid-cols-3 gap-4'>
            {typeColumns.map((column, columnIndex) => (
                <div key={`column-${columnIndex}`}>
                    {column.map((type) => (
                        <div key={type} className='flex items-center font-body text-base text-red-interactive'>
                            <input
                                type='checkbox'
                                id={type}
                                value={type}
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                                className='appearance-none w-4 h-4 mr-2 border-2 border-red-interactive checked:bg-red-interactive'
                            />
                            <label htmlFor={type} className='cursor-pointer'>
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TypeFilter;