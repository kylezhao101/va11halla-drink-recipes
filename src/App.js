import './App.css';
import DrinkCard from './components/DrinkCard';
import React, {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {firestore} from './util/firebase'
import {drinkData} from './util/testDrinkData'
function App() {

  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function fetchDrinks(){
      const drinksCollection = collection(firestore, 'test-drinks');
      const drinksSnapshotr = await getDocs(drinksCollection);
      const fetchedDrinks = [];

      drinksSnapshotr.forEach((drinkDoc) => {
        const drink = drinkDoc.data();
        fetchedDrinks.push(drink);
      });

      setDrinks(fetchedDrinks);
    }

    fetchDrinks();
  }, []);

  return (
    <div className="App">
      <div className='flex gap-2 flex-wrap'>
        {drinks.map((drink, index) => (
          <DrinkCard key={index} drink={drink}/>
        ))}
        <DrinkCard drink={drinkData['drink_id_5']}/>
        <DrinkCard drink={drinkData['drink_id_18']}/>
      </div>
    </div>
  );
}

export default App;
