import FoodPortionService from "../../Services/FoodPortionService/FoodPortionService.js";

export default class FoodPortionController {
    foodPortionService = new FoodPortionService();

    setupRoutes(webServer) {
        webServer.post("/foodportion", this.createFoodPortion);

        webServer.get("/foodportion/:id", this.getFoodPortion);

        webServer.put("/foodportion/:id", this.updateFoodPortion);

        webServer.delete("/foodportion/:id", this.deleteFoodPortion);
    }

    createFoodPortion = (req, res) => {
        const foodPortion = this.foodPortionService.create(req.body);
        res.status(201).send(foodPortion);
    };

    getFoodPortion = (req, res) => {};

    updateFoodPortion = (req, res) => {};

    deleteFoodPortion = (req, res) => {};
}
