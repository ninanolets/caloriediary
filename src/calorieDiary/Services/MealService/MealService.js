import HttpError from "../../Errors/HttpError.js";
import Meal from "../../Models/Meal.js";

export default class MealService {
    create(attrs) {
        const { dayId, name } = attrs;

        const meal = new Meal(dayId, name);

        meal.save();

        return meal;
    }

    getOne(mealId) {
        const meal = Meal.getOneById(mealId);

        if (!meal) {
            throw new HttpError(`Meal with id: ${mealId} not found`, 404);
        }

        return meal;
    }

    getMealsOfDay(dayId) {
        const meals = Meal.getByFilter("dayId", dayId);

        if (meals.length < 1) {
            throw new HttpError(`Meals of Day with id: ${dayId} not found`, 404);
        }

        return meals;
    }

    update(mealId, attrs) {
        const meal = this.getOne(mealId);

        const updateMeal = { ...meal, ...attrs };
        Meal.update(updateMeal);

        return updateMeal;
    }

    delete(mealId) {
        this.getOne(mealId);
        Meal.delete(mealId);
    }
}
