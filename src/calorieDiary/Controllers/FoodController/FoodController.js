import ActiveRecord from "../../Repositories/ActiveRecord.js";
import FoodService from "../../Services/FoodService/FoodService.js";
import handleError from "../../Errors/handleError.js";

export default class FoodController extends ActiveRecord {
    foodService = new FoodService();

    setupRoutes(webServer) {
        webServer.post("/foods", this.createFood);

        webServer.get("/foods", this.getAllFoods);
        webServer.get("/foods/:id", this.getFood);

        webServer.get("/food", this.searchFood);

        webServer.put("/foods/:id", this.updateFood);

        webServer.delete("/foods/:id", this.deleteFood);
    }

    createFood = (req, res) => {
        const { name } = req.body;
        const result = this.foodService.create(name);

        res.status(201).send(result);
    };

    getAllFoods = (req, res) => {
        res.send(this.foodService.getAll());
    };

    getFood = (req, res) => {
        const foodId = parseInt(req.params.id);
        console.log(foodId);

        try {
            const food = this.foodService.getOne(foodId);

            res.send(food);
        } catch (e) {
            handleError(res, e);
        }
    };

    searchFood = (req, res) => {
        const { name } = req.query;

        try {
            const foodSearched = this.foodService.searchByName(name);

            res.status(200).send(foodSearched);
        } catch (e) {
            handleError(res, e);
        }
    };

    updateFood = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            const updatedFood = this.foodService.update(req.body, foodId);
            res.status(200).send(updatedFood);
        } catch (e) {
            handleError(res, e);
        }
    };

    deleteFood = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            this.foodService.delete(foodId);
            res.status(204).send();
        } catch (e) {
            handleError(res, e);
        }
    };
}
