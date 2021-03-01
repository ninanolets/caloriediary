import FoodPortion from "../../Models/FoodPortion.js";

export default class FoodPortionService {
    create(attrs) {
        const { foodId, mealId, quantityInGrams } = attrs;

        const foodPortion = new FoodPortion(foodId, mealId, quantityInGrams);
        foodPortion.save();

        return foodPortion;
    }

    get() {}

    update() {}

    delete() {}
}
