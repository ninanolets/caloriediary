import Food from "../../Models/Food.js";

export default class FoodService {
    create(name) {
        const food = new Food(name);
        food.save();

        return food;
    }
}
