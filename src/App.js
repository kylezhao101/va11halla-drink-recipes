import './App.css';
import DrinkCard from './components/DrinkCard';
import FlavourFilter from './components/FlavourFilter';
import TypeFilter from './components/TypeFilter';
import React, {useMemo, useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {firestore} from './util/firebase'

document.body.style.backgroundColor = "#070C15";

function App() {

  const [drinks, setDrinks] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [detailedView, setDetailedView] = useState(true);

  useEffect(() => {
    async function fetchDrinks(){
      const drinksCollection = collection(firestore, 'drinks');
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
      const matchesSelectedTypes = selectedTypes.every(type => drink.Tags.includes(type));
      const matchesSelectedFlavour = !selectedFlavour || drink.Flavour.includes(selectedFlavour);

      return queryMatch && matchesSelectedTypes && matchesSelectedFlavour;
    });
  }, [drinks, query, selectedFlavour, selectedTypes]);

  return (
    <div className="App">
      <div className='flex'>
        <div>
          <input
              value = {query}
              onChange = {e => setQuery(e.target.value)}
              type = "search"
              placeholder = "Search drinks"
              className='text-lg font-body border-b-2 bg-transparent text-white'
          />
          
          <FlavourFilter selectedFlavour={selectedFlavour} setSelectedFlavour={setSelectedFlavour} />
        </div>

        <div className='flex gap-2 font-body'>
          <p className='text-white'>View</p>
          <div>
            <input
              type='radio'
              id='detailed'
              value='detailed'
              name='cardView'
              className='peer hidden'
              onChange={() => setDetailedView(true)}
            />
            <label htmlFor='detailed' className='block p-2 text-red-interactive peer-checked:text-white peer-checked:bg-red-interactive'>Detailed</label>
          </div>
          <div>
            <input
              type='radio'
              id='concise'
              value='concise'
              name='cardView'
              className='peer hidden'
              onChange={() => setDetailedView(false)}
            />
            <label htmlFor='concise' className='block p-2 text-red-interactive peer-checked:text-white peer-checked:bg-red-interactive'>Concise</label>
          </div>
        </div>
      </div>
      <div>
          <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        </div>
      <p className="text-base font-body text-white">({filteredDrinks.length})</p>
      <div className='flex gap-2 flex-wrap'>
        {filteredDrinks.map((drink, index) => (
          <DrinkCard key={index} drink={drink} detailedView={detailedView}/>
        ))}
      </div>
    </div>
  );
}

export default App;
