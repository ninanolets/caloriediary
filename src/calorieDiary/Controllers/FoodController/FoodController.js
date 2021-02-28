import ActiveRecord from "../../Repositories/ActiveRecord.js";
import FoodService from "../../Services/FoodService/FoodService.js";
import HttpError from "../../Errors/HttpError.js";

export default class FoodController extends ActiveRecord {
    foodService = new FoodService();

    setupRoutes(webServer) {
        webServer.post("/foods", this.createFood);

        webServer.get("/foods", this.getAllFoods);
        webServer.get("/foods/:id", this.getFood);

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

        try {
            const food = this.foodService.getOne(foodId);

            res.send(food);
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            }

            res.status(500).send(e);
        }
    };

    updateFood = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            const updatedFood = this.foodService.update(req.body, foodId);
            res.status(200).send(updatedFood);
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            }

            res.status(500).send(e.message);
        }
    };

    deleteFood = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            this.foodService.delete(foodId);
            res.status(204).send();
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            }

            res.status(500).send(e.message);
        }
    };
}
