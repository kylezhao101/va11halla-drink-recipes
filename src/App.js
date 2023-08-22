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
  const [selectedSort, setSelectedSort] = useState('name');

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

  const sortedFilteredDrinks = useMemo(() => {
    const lowercaseQuery = query.toLowerCase().replace(/[^\w\s]/g, ''); // Remove non-alphanumeric characters
    const queryWords = lowercaseQuery.split(/\s+/); // Split query into words
  
    const filteredDrinks = drinks.filter((drink) => {
      const combinedText = `${drink.Name} ${drink.Flavour.join(' ')} ${drink.Tags.join(' ')} ${drink.Preparation.join(' ')}`;
      
      const queryMatch = queryWords.every(word => combinedText.toLowerCase().includes(word));
      const matchesSelectedTypes = selectedTypes.every(type => drink.Tags.includes(type));
      const matchesSelectedFlavour = !selectedFlavour || drink.Flavour.includes(selectedFlavour);

      return queryMatch && matchesSelectedTypes && matchesSelectedFlavour;
    });

    switch (selectedSort) {
      case 'name':
        return [...filteredDrinks].sort((a, b) => a.Name.localeCompare(b.Name));
      case 'price':
        return [...filteredDrinks].sort((a, b) => a.Price - b.Price);
      case 'flavour':
        return [...filteredDrinks].sort((a, b) => a.Flavour[0].localeCompare(b.Flavour[0]));
      default:
        return filteredDrinks;
    }
  }, [drinks, query, selectedFlavour, selectedTypes, selectedSort]);

  return (
    <div className="App p-14">
      <div className='flex flex-col gap-2'>
        <input
            value = {query}
            onChange = {e => setQuery(e.target.value)}
            type = "search"
            placeholder = "Search drinks"
            className='text-lg font-body border-b-2 bg-transparent text-white w-1/2'
        />
        <div className='flex justify-between items-center mb-5'>
          <FlavourFilter selectedFlavour={selectedFlavour} setSelectedFlavour={setSelectedFlavour} />
          <div className='flex w-1/3 justify-between'>
            <div className='flex flex-col'>
              <SortToggle selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
              <CardViewToggle detailedView={detailedView} setDetailedView={setDetailedView} />
            </div>
          </div>
        </div>
      </div>      
      <div className='flex'>
        <div className='flex flex-col gap-2 mr-20'>
          <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        </div>
        <div>
          <p className="font-body text-2xl text-white">({sortedFilteredDrinks.length})</p> 
          <div className='flex gap-2 flex-wrap'>
            {sortedFilteredDrinks.map((drink, index) => (
              <DrinkCard key={index} drink={drink} detailedView={detailedView}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
