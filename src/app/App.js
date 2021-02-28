import express from "express";
import bodyParser from "body-parser";
import FoodController from "../calorieDiary/Controllers/FoodController/FoodController.js";
import NutritionalInformationController from "../calorieDiary/Controllers/NutriInfoController/NutritionalInformationController.js";

class App {
    constructor(port) {
        this.webServer = express();
        this.port = port;

        this.configureMiddlewares();
        this.configureRoutes();
    }

    start() {
        this.webServer.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    configureMiddlewares() {
        this.webServer.use(
            bodyParser.urlencoded({
                // to support URL-encoded bodies
                extended: true,
            })
        );

        this.webServer.use(bodyParser.json());
    }

    configureRoutes() {
        const foodController = new FoodController();
        foodController.setupRoutes(this.webServer);

        const nutriInfoController = new NutritionalInformationController();
        nutriInfoController.setupRoutes(this.webServer);
    }
}

export default App;
