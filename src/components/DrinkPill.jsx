const getIngredientBackground = (ingredient) => {
  switch (ingredient) {
    case "Adelhyde":
      return "bg-red-adelhyde";
    case "Bronson Extract":
      return "bg-yellow-bronson";
    case "Powdered Delta":
      return "bg-blue-powdered";
    case "Flanergide":
      return "bg-green-flanergide";
    case "Karmotrine":
      return "bg-cyan-karmotrine";
    case "Optional Karmotrine":
      return "border-2 border-cyan-karmotrine bg-opacity-0";
    default:
      return "bg-gray";
  }
};

const DrinkPill = ({ ingredient, amount }) => {
  const ingredientBackground = getIngredientBackground(ingredient);

  return (
    <>
      {Array.from({ length: amount }, (_, index) => (
        <div
          key={`${ingredient}-${index}`}
          className={`inline-block h-2 w-5 mr-1 rounded-full ${ingredientBackground} `}
        ></div>
      ))}
    </>
  );
};

export default DrinkPill;
