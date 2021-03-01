import handleError from "../../Errors/handleError.js";
import HttpError from "../../Errors/HttpError.js";
import NutritionalInformationService from "../../Services/NutriInfoService/NutritionalInformationService.js";

export default class NutritionalInformationController {
    nutriService = new NutritionalInformationService();

    setupRoutes(webServer) {
        webServer.post("/foods/:id/nutriinfo", this.createNutriInfo);

        webServer.get("/foods/:id/nutriinfo", this.getNutriInfo);

        webServer.put("/foods/:id/nutriinfo", this.updateNutriInfo);

        webServer.delete("/foods/:id/nutriinfo", this.deleteNutriInfo);
    }

    createNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        const result = this.nutriService.create(foodId, req.body);

        res.status(201).send(result);
    };

    getNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            const nutri = this.nutriService.getInfo(foodId);

            res.send(nutri);
        } catch (e) {
            handleError(res, e);
        }
    };

    updateNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            const updatedNutri = this.nutriService.update(foodId, req.body);

            res.status(200).send(updatedNutri);
        } catch (e) {
            handleError(res, e);
        }
    };

    deleteNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        try {
            this.nutriService.delete(foodId);
            res.status(204).send();
        } catch (e) {
            handleError(res, e);
        }
    };
}
