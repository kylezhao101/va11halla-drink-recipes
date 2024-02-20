import React from "react";
import '../App.css';

const getIngredientColor = (ingredient) => {
    switch (ingredient) {
        case "Adelhyde":
            return "text-red-adelhyde";
        case "Bronson Extract":
            return "text-yellow-bronson";
        case "Powdered Delta":
            return "text-blue-powdered";
        case "Flanergide":
            return "text-green-flanergide"
        case "Karmotrine":
            return "text-cyan-karmotrine"
        case "Optional Karmotrine":
            return "text-cyan-karmotrine"
        default:
            return "text-gray";
    }
};

const getIngredientBackground = (ingredient) => {
    switch (ingredient) {
        case "Adelhyde":
            return "bg-red-adelhyde";
        case "Bronson Extract":
            return "bg-yellow-bronson";
        case "Powdered Delta":
            return "bg-blue-powdered";
        case "Flanergide":
            return "bg-green-flanergide"
        case "Karmotrine":
            return "bg-cyan-karmotrine"
        case "Optional Karmotrine":
            return "border-2 border-cyan-karmotrine bg-opacity-0"
        default:
            return "bg-gray";
    }
};

const sortIngredients = (ingredients) => {
    return Object.entries(ingredients)
        .filter(([ingredient, amount]) => amount > 0)
        .sort(([ingredientA], [ingredientB]) => {
            const order = [
                'Adelhyde',
                'Bronson Extract',
                'Powdered Delta',
                'Flanergide',
                'Karmotrine',
                'Optional Karmotrine'
            ];

            return order.indexOf(ingredientA) - order.indexOf(ingredientB);
        });
};

const DrinkCard = ({ drink, detailedView }) => {
    const sortedIngredients = sortIngredients(drink.Ingredients)

    const ingredientsList = sortedIngredients.map(([ingredient, amount]) => {
        const textColor = getIngredientColor(ingredient);

        return (
            <div key={ingredient} className={`${textColor}`}>
                {amount} {ingredient}{" "}
            </div>
        );
    });

    const ingredientPills = sortedIngredients.flatMap(([ingredient, amount]) => {
        var textColor = getIngredientBackground(ingredient);

        return Array.from({ length: amount }, (_, index) => (
            <div
                key={`${ingredient}-${index}`}
                className={`inline-block h-2 w-5 mr-1 rounded-full ${textColor} `}
            >
            </div>
        ));
    });

    return (
        <div className="font-body w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 border-2 border-gray-600 p-3 flex flex-col">
            <button type='button' className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="gray" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <p className="text-base text-gray-500">{drink.Favorites}</p>
            </button>
            <img className="mx-auto mt-2 mb-2 object-contain max-h-28" src={drink.Image} alt={drink.Name} />
            <h2 className="font-bold text-xl text-white text-opacity-90">{drink.Name}</h2>
            <h3 className="font-bold text-base text-white text-opacity-90">
                {drink.Flavour.join(", ")}, {drink.Tags.join(", ")}
            </h3>
            <div className="mt-2">
                {ingredientPills}
            </div>
            {detailedView && (
                <div className="text-base mt-2">
                    {ingredientsList}
                </div>
            )}
            <p className="text-base font-bold mt-2 mb-4 text-white text-opacity-90">
                {drink.Preparation}
            </p>
            {detailedView && (
                <p className="italic text-base text-white text-opacity-90 mb-4">
                    {drink.Quote}
                </p>
            )}
            <h3 className="mt-auto font-bold text-xl text-white text-opacity-90">
                ${drink.Price}
            </h3>
        </div>

    );
};

export default DrinkCard;