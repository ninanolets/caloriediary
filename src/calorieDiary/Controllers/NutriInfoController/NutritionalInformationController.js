import NutritionalInformationService from "../../Services/NutriInfoService/NutritionalInformationService.js";

export default class NutritionalInformationController {
    nutriInfo = new NutritionalInformationService();

    setupRoutes(webServer) {
        webServer.post("/foods/:id/nutriinfo", this.createNutriInfo);
        webServer.get("/foods/:id/nutriinfo", this.getNutriInfo);
    }

    createNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        const result = this.nutriInfo.create(foodId, req.body);

        res.status(201).send(result);
    };

    getNutriInfo = (req, res) => {
        const foodId = parseInt(req.params.id);

        const nutri = this.nutriInfo.getInfo(foodId);

        res.send(nutri);
    };
}
