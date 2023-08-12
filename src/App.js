import './App.css';
import DrinkCard from './components/DrinkCard';
import React, {useMemo, useRef, useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {firestore} from './util/firebase'

function App() {

  const [drinks, setDrinks] = useState([]);
  const [query, setQuery] = useState("");

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
    const lowercaseQuery = query.toLowerCase();
    return drinks.filter(drink => {
      return (
        drink.Name.toLowerCase().includes(lowercaseQuery) ||
        drink.Flavour.some((flavour) => flavour.toLowerCase().includes(lowercaseQuery)) ||
        drink.Tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) || 
        drink.Preparation.some((preparation) => preparation.toLowerCase().includes(lowercaseQuery))
      );
    });
  }, [drinks, query]);


  return (
    <div className="App">
      <input
          value = {query}
          onChange = {e => setQuery(e.target.value)}
          type = "search"
          placeholder = "search drinks"
        />
      <div className='flex gap-2 flex-wrap'>
        {filteredDrinks.map((drink, index) => (
          <DrinkCard key={index} drink={drink}/>
        ))}
      </div>
    </div>
  );
}

export default App;
