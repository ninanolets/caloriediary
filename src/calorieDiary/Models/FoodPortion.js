import ActiveRecord from "../Repositories/ActiveRecord.js";

export default class FoodPortion extends ActiveRecord {
    constructor(foodId, mealId, quantityInGrams) {
        super();
        this.foodId = foodId;
        this.mealId = mealId;
        this.quantityInGrams = quantityInGrams;
    }
}
