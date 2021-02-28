import MealRepository from "../../Repositories/MealRepository/MealRepository.js";
import { dummyMealData } from "../../Repositories/MealRepository/dummyMealData.js";
import MealService from "../../Services/MealService/MealService.js";
import Meal from "../../Models/Meal.js";

class MealController {
    mealRepo = new MealRepository(dummyMealData);
    mealService = new MealService();

    setupRoutes(webServer) {
        // CREATE
        webServer.post("/meal", this.createMealRecord);

        // READ
        webServer.get("/meal", this.getAllMeals);
        webServer.get("/meal/:id", this.getMealRecord);

        // UPDATE
        webServer.put("/meal/:id", this.updateMealRecord);

        // DElETE
        webServer.delete("/meal/:id", this.deleteMealRecord);
    }

    createMealRecord = (req, res) => {
        const { mealTime, foods } = req.body;
        const meal = new Meal(mealTime, foods);
        meal.save();

        res.status(201).send(meal);
    };

    // READ
    getAllMeals = (req, res) => {
        res.send(Meal.getAll());
    };

    getMealRecord = (req, res) => {
        const mealId = parseInt(req.params.id);
        const meal = Meal.getOneById(mealId);

        if (!meal) {
            res.status(404).send("Meal not found");
        }

        res.send(meal);
    };

    updateMealRecord = (req, res) => {
        const { mealTime, foods } = req.body;
        const mealId = parseInt(req.params.id);

        const updatedMeal = Meal.update(mealId, {
            mealTime,
            foods,
        });

        res.status(201).send(updatedMeal);
    };

    // DElETE
    deleteMealRecord = (req, res) => {
        const mealId = parseInt(req.params.id);
        Meal.delete(mealId);
        res.send(Meal.getAll());
    };
}

export default MealController;
