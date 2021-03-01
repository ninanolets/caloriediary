import HttpError from "../../Errors/HttpError.js";
import FoodPortion from "../../Models/FoodPortion.js";

export default class FoodPortionService {
    create(attrs) {
        const { foodId, mealId, quantityInGrams } = attrs;

        const foodPortion = new FoodPortion(foodId, mealId, quantityInGrams);
        foodPortion.save();

        return foodPortion;
    }

    get(foodPortionId) {
        const foodPortion = FoodPortion.getOneById(foodPortionId);

        if (!foodPortion) {
            throw new HttpError(`Food portion with id: ${foodPortionId} not found`, 404);
        }

        return foodPortion;
    }

    update(foodPortionId, attrs) {
        const oldFoodPortion = this.get(foodPortionId);
        const foodPortionToUpdate = { ...oldFoodPortion, ...attrs };
        FoodPortion.update(foodPortionToUpdate);

        return foodPortionToUpdate;
    }

    delete(foodPortionId) {
        this.get(foodPortionId);
        FoodPortion.delete(foodPortionId);
    }
}
