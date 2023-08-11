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
        <div className="drink-card font-body">
            <img src={drink.Image} alt={drink.Name}/>
            <h2 className="font-bold text-xl">{drink.Name}</h2>
            <h3 className="font-bold text-base">
                {drink.Flavour.join(", ")}, {drink.Tags.join(", ")}
            </h3>
            <div className="text-base mt-4">
                {ingredientsList}
            </div>
            <p className="text-base mt-2">
                {drink.Preparation}
            </p>
            <p className="italic text-base mt-4">
                {drink.Quote}
            </p>
            <h3 className="font-bold text-xl">
                ${drink.Price}
            </h3>
        </div>

    );
};

export default DrinkCard;
