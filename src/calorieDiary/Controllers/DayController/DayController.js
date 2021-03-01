import HttpError from "../../Errors/HttpError.js";
import DayService from "../../Services/DayService/DayService.js";

export default class DayController {
    dayService = new DayService();

    setupRoutes(webServer) {
        webServer.post("/day", this.createDay);

        webServer.get("/day/:id", this.getDay);

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
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    };

    updateDay = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            const updatedDay = this.dayService.update(dayId, req.body);

            res.status(201).send(updatedDay);
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    };

    deleteDay = (req, res) => {
        const dayId = parseInt(req.params.id);

        try {
            this.dayService.delete(dayId);
            res.status(200).send();
        } catch (e) {
            if (e instanceof HttpError) {
                res.status(e.statusCode).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    };
}
