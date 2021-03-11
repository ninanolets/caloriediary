import handleError from "../../Errors/handleError.js";
import DayService from "../../Services/DayService/DayService.js";

export default class DayController {
    dayService = new DayService();

    setupRoutes(webServer) {
        webServer.post("/day", this.createDay);

        webServer.get("/day/:id", this.getDay);

        webServer.get("/day/macros/:id", this.getMacrosLeft);
        webServer.get("/day/percent/:id", this.getMacrosPercentage);

        webServer.put("/day/:id", this.updateDay);

        webServer.delete("/day/:id", this.deleteDay);
    }

    createDay = (req, res) => {
        const day = this.dayService.create(req.body);

        res.status(201).send(day);
    };

    getDay = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            const day = this.dayService.get(dayId);

            res.status(200).send(day);
        } catch (e) {
            handleError(res, e);
        }
    };

    getMacrosLeft = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            const macrosLeft = this.dayService.getMacros(dayId);

            res.status(200).send(macrosLeft);
        } catch (e) {
            handleError(res, e);
        }
    };

    getMacrosPercentage = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            const macrosPercent = this.dayService.getPercentage(dayId);

            res.status(200).send(macrosPercent);
        } catch (e) {
            handleError(res, e);
        }
    };

    updateDay = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            const updatedDay = this.dayService.update(dayId, req.body);

            res.status(201).send(updatedDay);
        } catch (e) {
            handleError(res, e);
        }
    };

    deleteDay = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            this.dayService.delete(dayId);
            res.status(204).send();
        } catch (e) {
            handleError(res, e);
        }
    };
}
