import Food from "../../Models/Food.js";
import HttpError from "../../Errors/HttpError.js";

export default class FoodService {
    create(name) {
        const food = new Food(name);
        food.save();

        return food;
    }

    getAll() {
        return Food.getAll();
    }

    getOne(id) {
        const food = Food.getOneById(id);

        if (!food) {
            throw new HttpError(`Could not find food with id ${id}`, 404);
        }

        return food;
    }

    searchByName(name) {
        const food = Food.getByFilter("name", name);

        if (!food) {
            throw new HttpError(`Could not find food with name: ${name}`, 404);
        }

        return food;
    }

    update(foodToUpdate, id) {
        const food = this.getOne(id);
        const updatedFood = { ...food, ...foodToUpdate };
        Food.update(updatedFood);

        return updatedFood;
    }

    delete(id) {
        this.getOne(id);
        Food.delete(id);
    }
}
