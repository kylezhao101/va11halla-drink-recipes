import './App.css';
import DrinkCard from './components/DrinkCard';
import FlavourFilter from './components/FlavourFilter';
import TypeFilter from './components/TypeFilter';
import CardViewToggle from './components/CardViewToggle';
import SortToggle from './components/SortToggle';
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
  const [selectedSort, setSelectedSort] = useState('');

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
      <div className='flex gap-x-11'>
        
        <div>
          <input
              value = {query}
              onChange = {e => setQuery(e.target.value)}
              type = "search"
              placeholder = "Search drinks"
              className='text-lg font-body border-b-2 bg-transparent text-white w-full'
          />
          
          <FlavourFilter selectedFlavour={selectedFlavour} setSelectedFlavour={setSelectedFlavour} />
        </div>
        <div className=''> 
            <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
          </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className="font-body text-2xl text-white">({filteredDrinks.length})</p> 
        <div className='flex w-1/2 flex-col'>
          <SortToggle selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <CardViewToggle detailedView={detailedView} setDetailedView={setDetailedView} />
        </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {filteredDrinks.map((drink, index) => (
          <DrinkCard key={index} drink={drink} detailedView={detailedView}/>
        ))}
      </div>
    </div>
  );
}

export default App;
