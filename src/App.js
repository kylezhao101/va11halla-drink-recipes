import './App.css';
import DrinkCard from './components/DrinkCard';

const drinkData = {
  "drink_id_18": {
    "Image": 'https://static.wikia.nocookie.net/va11halla/images/8/8d/Piano_Man.png/revision/latest?cb=20170601162912',
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
      "Karmotrine": 3
    },
    "Preparation": [
      "on the rocks and mixed"
    ],
    "Price": 320,
    "Quote": "This drink does not represent the opinions of the Bar Pianists Union or its associates."
  }
};

function App() {
  return (
    <div className="App">
      <DrinkCard drink={drinkData['drink_id_18']}/>
    </div>
  );
}

export default App;
