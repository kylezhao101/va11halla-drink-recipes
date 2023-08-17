import './App.css';
import DrinkCard from './components/DrinkCard';
import React, {useMemo, useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {firestore} from './util/firebase'

function App() {

  const [drinks, setDrinks] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState(null);

  useEffect(() => {
    async function fetchDrinks(){
      const drinksCollection = collection(firestore, 'test-drinks');
      const drinksSnapshot = await getDocs(drinksCollection);
      const fetchedDrinks = [];

      drinksSnapshot.forEach((drinkDoc) => {
        const drink = drinkDoc.data();
        fetchedDrinks.push(drink);
      });

      setDrinks(fetchedDrinks);
    }
    fetchDrinks();
  }, []);

  const filteredDrinks = useMemo(() => {
    const lowercaseQuery = query.toLowerCase().replace(/[^\w\s]/g, ''); // Remove non-alphanumeric characters
    const queryWords = lowercaseQuery.split(/\s+/); // Split query into words
  
    return drinks.filter((drink) => {
      const combinedText = `${drink.Name} ${drink.Flavour.join(' ')} ${drink.Tags.join(' ')} ${drink.Preparation.join(' ')}`;
      const queryMatch = queryWords.every(word => combinedText.toLowerCase().includes(word));
  
      if (selectedFlavour) {
        return queryMatch && drink.Flavour.includes(selectedFlavour);
      } else {
        return queryMatch;
      }
    });
  }, [drinks, query, selectedFlavour]);

  return (
    <div className="App">
      <input
          value = {query}
          onChange = {e => setQuery(e.target.value)}
          type = "search"
          placeholder = "search drinks"
      />
      <div className='flex font-body text-red-interactive'>
        <div>
          <input type='radio' id='All' value='All' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour(null)}/>
          <label for='All' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>All</label>
        </div>
        <div>
          <input type='radio' id='Bitter' value='Bitter' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour("Bitter")}/>
          <label for='Bitter' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>Bitter</label>
        </div>
        <div>
          <input type='radio' id='Bubbly' value='Bubbly' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour("Bubbly")}/>
          <label for='Bubbly' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>Bubbly</label>
        </div>
        <div>
          <input type='radio' id='Sour' value='Sour' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour("Sour")}/>
          <label for='Sour' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>Sour</label>
        </div>
        <div>
          <input type='radio' id='Spicy' value='Spicy' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour("Spicy")}/>
          <label for='Spicy' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>Spicy</label>
        </div>
        <div>
          <input type='radio' id='Sweet' value='Sweet' name='flavour' className='peer hidden' onClick={() => setSelectedFlavour("Sweet")}/>
          <label for='Sweet' className='block p-2 cursor-pointer hover:bg-cyan-100 select-none text-center peer-checked:bg-red-interactive peer-checked:text-white'>Sweet</label>
        </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {filteredDrinks.map((drink, index) => (
          <DrinkCard key={index} drink={drink}/>
        ))}
      </div>
    </div>
  );
}

export default App;
