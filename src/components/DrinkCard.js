import React from "react";
import '../App.css';

const getIngredientColor = (ingredient) => {
    switch(ingredient){
        case "Adelhyde":
            return "text-red-adelhyde";
        case "Bronson Extract":
            return "text-yellow-bronson";
        case "Powdered Delta":
            return "text-blue-powdered";
        case "Flanergide":
            return "text-green-flanergide"
        case  "Karmotrine":
            return "text-cyan-karmotrine"
        default:
            return "text-gray";
    }
};


const DrinkCard = ({drink}) => {
    const ingredientsList = Object.entries(drink.Ingredients)
        .filter(([ingredient, amount]) => amount > 0)
        .map(([ingredient, amount]) => {
            const textColor = getIngredientColor(ingredient);

            return(
                <div key={ingredient} className={`${textColor}`}>
                    {amount} {ingredient}{" "}
                </div>
            );
        });

    return(
        <div className="drink-card">
            <img src={drink.Image} alt={drink.Name}/>
            <h2 className="">{drink.Name}</h2>
            <h3 className="">
                {drink.Flavour.join(", ")}, {drink.Tags.join(", ")}
            </h3>
            <div className="">
                {ingredientsList}
            </div>
            <p className="">
                {drink.Preparation}
            </p>
            <p className="">
                {drink.Quote}
            </p>
            <h3 className="">
                ${drink.Price}
            </h3>
        </div>

    );
};

export default DrinkCard;
