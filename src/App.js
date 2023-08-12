import './App.css';
import DrinkCard from './components/DrinkCard';

const drinkData = {
  "drink_id_18": {
    "Image": 'https://static.wikia.nocookie.net/va11halla/images/8/8d/Piano_Man.png',
    "Name": "Piano Man",
    "Flavour": [
      "Sour"
    ],
    "Tags": [
      "Promo",
      "Strong"
    ],
    "Ingredients": {
      "Adelhyde": 2,
      "Bronson Extract": 3,
      "Powdered Delta": 5,
      "Flanergide": 5,
      "Karmotrine": 3,
      "Optional Karmotrine": false
    },
    "Preparation": [
      "on the rocks and mixed"
    ],
    "Price": 320,
    "Quote": "This drink does not represent the opinions of the Bar Pianists Union or its associates."
  },
  "drink_id_5": {
    "Image": 'https://static.wikia.nocookie.net/va11halla/images/6/62/BlueFairy.png',
    "Name": "Blue Fairy",
    "Flavour": [
      "Sweet"
    ],
    "Tags": [
      "Girly",
      "Soft"
    ],
    "Ingredients": {
      "Adelhyde": 4,
      "Bronson Extract": 0,
      "Powdered Delta": 0,
      "Flanergide": 1,
      "Karmotrine": 0,
      "Optional Karmotrine" : true
    },
    "Preparation": [
      "aged and mixed"
    ],
    "Price": 170,
    "Quote": "One of these will make all your teeth turn blue. Hope you brushed them well."
  }
};

function App() {
  return (
    <div className="App">
      <DrinkCard drink={drinkData['drink_id_18']}/>
      <DrinkCard drink={drinkData['drink_id_5']}/>
    </div>
  );
}

export default App;
