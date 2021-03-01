import handleError from "../../Errors/handleError.js";
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

    getFoodPortion = (req, res) => {
        const foodPortionId = parseInt(req.params.id);

        try {
            const foodPortion = this.foodPortionService.get(foodPortionId);

            res.status(200).send(foodPortion);
        } catch (e) {
            handleError(res, e);
        }
    };

    updateFoodPortion = (req, res) => {
        const foodPortionId = parseInt(req.params.id);

        try {
            const updatedFoodPortion = this.foodPortionService.update(
                foodPortionId,
                req.body
            );

            res.status(200).send(updatedFoodPortion);
        } catch (e) {
            handleError(res, e);
        }
    };

    deleteFoodPortion = (req, res) => {};
}
