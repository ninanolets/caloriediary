class FoodController {
    constructor(repo) {
        this.repo = repo;
    }

    setupRoutes(webServer) {
        // CREATE
        webServer.get("/create/food", this.addFoodRecord);
        webServer.post("/create/food", this.createFoodRecord);

        // READ
        webServer.get("/foods", this.getAllFoods);
        webServer.get("/foods/:id", this.getFoodRecord);
        webServer.get("/foods/");

        // UPDATE
        webServer.get("/update/food/:id", this.changeFoodRecord);
        webServer.post("/update/food/:id", this.updateFoodRecord);

        // DELETE
        webServer.delete("/delete/food/:id", this.deleteFoodRecord);
    }

    // CREATE
    addFoodRecord = (req, res) => {
        res.send(`
            <form method="POST">
                <input type="text" name="foodName" placeholder="Food to create" />
                <button>Create Food</button>
            </form>
        `);
    };

    createFoodRecord = (req, res) => {
        const { foodName } = req.body;
        const food = this.repo.createFood({ foodName });
        res.status(201).send(food);
        // 201 status code is as the result of a POST request. Check it bafore res.send()
    };

    // READ
    getAllFoods = (req, res) => {
        res.send(this.repo.getAll());
    };

    getFoodRecord = (req, res) => {
        const foodId = parseInt(req.params.id);
        const food = this.repo.getOneById(foodId);

        if (!food) {
            res.status(404).send({ Error: "Food not found" });
        }
        res.send(food);
    };

    // UPDATE
    changeFoodRecord = (req, res) => {
        const foodId = req.params.id;
        res.send(`
            <form method="POST">
                <h2>Update food</h2>
                <input type="text" name"foodId" value="${foodId}" />
                <input type="text" name="foodName" placeholder="Update food name" />
                <input type="text" name="foodKcal" placeholder="Update food calorie" />
                <button>Update Food</button>
            </form>
        `);
    };

    updateFoodRecord = (req, res) => {
        const foodId = parseInt(req.params.id);
        const { foodName, foodKcal } = req.body;

        const updatedFood = this.repo.updateFood(foodId, {
            foodName,
            foodKcal,
        });
        res.status(201).send(updatedFood);
    };

    // DELETE
    deleteFoodRecord = (req, res) => {
        const foodId = req.params.id;
        const allNewFoods = this.repo.deleteFood(foodId);
        res.send(allNewFoods);
    };
}

export default FoodController;
