import express from "express";
import bodyParser from "body-parser";
import FoodController from "../calorieDiary/Controllers/FoodController/FoodController.js";
import FoodRepository from "../calorieDiary/Repositories/FoodRepository/FoodRepository.js";

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

    configureRoutes() {
        const foodsRepo = new FoodRepository();
        const foodController = new FoodController(foodsRepo);
        foodController.setupRoutes(this.webServer);
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
}

export default App;
