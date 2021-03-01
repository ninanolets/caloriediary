import handleError from "../../Errors/handleError.js";
import MealService from "../../Services/MealService/MealService.js";

export default class MealController {
    mealService = new MealService();

    setupRoutes(webServer) {
        webServer.post("/meal", this.createMeal);

        webServer.get("/meal/:id", this.getMeal);
        webServer.get("/meals/:dayId", this.getDayMeals);

        webServer.put("/meal/:id", this.updateMeal);

        webServer.delete("/meal/:id", this.deleteMeal);
    }

    createMeal = (req, res) => {
        const newMeal = this.mealService.create(req.body);
        res.status(201).send(newMeal);
    };

    getMeal = (req, res) => {
        const mealId = parseInt(req.params.id);

        try {
            const meal = this.mealService.getOne(mealId);

            res.status(200).send(meal);
        } catch (e) {
            handleError(res, e);
        }
    };

    getDayMeals = (req, res) => {
        const dayId = parseInt(req.params.dayId);

        try {
            const dayMeals = this.mealService.getMealsOfDay(dayId);

            res.status(200).send(dayMeals);
        } catch (e) {
            handleError(res, e);
        }
    };

    updateMeal = (req, res) => {
        const mealId = parseInt(req.params.id);

        try {
            const updatedMeal = this.mealService.update(mealId, req.body);

            res.status(200).send(updatedMeal);
        } catch (e) {
            handleError(res, e);
        }
    };

    deleteMeal = (req, res) => {
        const mealId = parseInt(req.params.id);

        try {
            this.mealService.delete(mealId);

            res.status(204).send();
        } catch (e) {
            handleError(res, e);
        }
    };
}
