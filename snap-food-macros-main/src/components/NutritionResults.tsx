import { Utensils, Flame, Drumstick, Cookie, Droplet } from "lucide-react";

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionResultsProps {
  data: {
    status: string;
    food: FoodItem[];
  };
}

export const NutritionResults = ({ data }: NutritionResultsProps) => {
  const totalMacros = data.food.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in space-y-6">
      {/* Individual Food Items */}
      {data.food.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-card rounded-lg p-6 shadow-card border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
            <span className="ml-auto text-sm text-muted-foreground">{item.quantity}</span>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <Flame className="w-6 h-6 mx-auto mb-1 text-accent" />
              <p className="text-xs text-muted-foreground mb-1">Calories</p>
              <p className="text-lg font-bold text-foreground">
                {item.calories}
                <span className="text-xs text-muted-foreground ml-1">kcal</span>
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <Drumstick className="w-6 h-6 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground mb-1">Protein</p>
              <p className="text-lg font-bold text-foreground">
                {item.protein}
                <span className="text-xs text-muted-foreground ml-1">g</span>
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <Cookie className="w-6 h-6 mx-auto mb-1 text-blue-500" />
              <p className="text-xs text-muted-foreground mb-1">Carbs</p>
              <p className="text-lg font-bold text-foreground">
                {item.carbs}
                <span className="text-xs text-muted-foreground ml-1">g</span>
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <Droplet className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
              <p className="text-xs text-muted-foreground mb-1">Fat</p>
              <p className="text-lg font-bold text-foreground">
                {item.fat}
                <span className="text-xs text-muted-foreground ml-1">g</span>
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Total Summary */}
      <div className="bg-primary/5 rounded-lg p-6 border-2 border-primary/20">
        <h3 className="text-xl font-bold text-foreground mb-4 text-center">Total Nutrition</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-sm text-muted-foreground mb-1">Calories</p>
            <p className="text-2xl font-bold text-foreground">
              {totalMacros.calories}
              <span className="text-sm text-muted-foreground ml-1">kcal</span>
            </p>
          </div>
          <div className="text-center">
            <Drumstick className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground mb-1">Protein</p>
            <p className="text-2xl font-bold text-foreground">
              {totalMacros.protein}
              <span className="text-sm text-muted-foreground ml-1">g</span>
            </p>
          </div>
          <div className="text-center">
            <Cookie className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-muted-foreground mb-1">Carbs</p>
            <p className="text-2xl font-bold text-foreground">
              {totalMacros.carbs}
              <span className="text-sm text-muted-foreground ml-1">g</span>
            </p>
          </div>
          <div className="text-center">
            <Droplet className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-sm text-muted-foreground mb-1">Fat</p>
            <p className="text-2xl font-bold text-foreground">
              {totalMacros.fat}
              <span className="text-sm text-muted-foreground ml-1">g</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
