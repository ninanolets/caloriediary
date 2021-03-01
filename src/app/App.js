import express from "express";
import bodyParser from "body-parser";

import FoodController from "../calorieDiary/Controllers/FoodController/FoodController.js";
import NutritionalInformationController from "../calorieDiary/Controllers/NutriInfoController/NutritionalInformationController.js";
import DayController from "../calorieDiary/Controllers/DayController/DayController.js";
import MealController from "../calorieDiary/Controllers/MealController/MealController.js";
import FoodPortionController from "../calorieDiary/Controllers/FoodPortionController/FoodPortionController.js";

export default class App {
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

        const dayController = new DayController();
        dayController.setupRoutes(this.webServer);

        const mealController = new MealController();
        mealController.setupRoutes(this.webServer);

        const foodPortionController = new FoodPortionController();
        foodPortionController.setupRoutes(this.webServer);
    }
}
