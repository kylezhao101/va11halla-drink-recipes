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

const getIngredientBackground = (ingredient) => {
    switch(ingredient){
        case "Adelhyde":
            return "bg-red-adelhyde";
        case "Bronson Extract":
            return "bg-yellow-bronson";
        case "Powdered Delta":
            return "bg-blue-powdered";
        case "Flanergide":
            return "bg-green-flanergide"
        case  "Karmotrine":
            return "bg-cyan-karmotrine"
        default:
            return "bg-gray";
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
    
    const ingredientPills = Object.entries(drink.Ingredients)
        .filter(([ingredient, amount]) => amount > 0)
        .flatMap(([ingredient, amount]) => {
            var textColor = getIngredientBackground(ingredient);
            
            return Array.from({ length: amount}, (_, index) => (
                <div
                    key={`${ingredient}-${index}`}
                    className={`inline-block h-2 w-5 mr-1 rounded-full ${textColor} `}
                >
                </div>
            ));
        });

    return(
        <div className="drink-card font-body w-72 border-2 p-3 flex flex-col">
            <img className="mx-auto mt-2 mb-2" src={drink.Image} alt={drink.Name}/>
            <h2 className="font-bold text-xl">{drink.Name}</h2>
            <h3 className="font-bold text-base">
                {drink.Flavour.join(", ")}, {drink.Tags.join(", ")}
            </h3>
            <div className="mt-2">
                {ingredientPills}
            </div>
            <div className="text-base mt-2">
                {ingredientsList}
            </div>
            <p className="text-base mt-2">
                {drink.Preparation}
            </p>
            <p className="italic text-base mt-4">
                {drink.Quote}
            </p>
            <h3 className="font-bold text-xl mt-4">
                ${drink.Price}
            </h3>
        </div>

    );
};

export default DrinkCard;