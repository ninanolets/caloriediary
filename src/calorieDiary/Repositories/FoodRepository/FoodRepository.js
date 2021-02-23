// import { dummyFoodData } from "./dummyFoodData.js";

let dummyFoodData = [
    { id: 1, foodName: "Rice" },
    { id: 2, foodName: "Beans" },
    { id: 3, foodName: "Eggs" },
    { id: 4, foodName: "Orange" },
    { id: 5, foodName: "Mince" },
    { id: 6, foodName: "Chicken Breast" },
    { id: 7, foodName: "Bread" },
    { id: 8, foodName: "Pasta" },
    { id: 9, foodName: "Pork" },
    { id: 10, foodName: "Olive Oil" },
];

// Only CRUD functionality here
class FoodRepository {
    // CREATE
    createFood(attrs) {
        const records = dummyFoodData;
        const foodId = records[records.length - 1].id + 1;
        attrs.id = foodId;
        records.push(attrs);

        return attrs;
    }

    // READ
    getAll() {
        return dummyFoodData;
    }

    getOneById(id) {
        if (id <= 0 || id > dummyFoodData.length) return "Food id not found";

        return dummyFoodData.find((foodData) => foodData.id === id);
    }

    getOneByFilters(filters) {}

    // UPDATE
    updateFood(id, attrs) {
        const records = dummyFoodData;
        const record = records.find((record) => record.id === id);

        if (!record) return `Food with id:${id} not found`;

        // Object.assign updates all properties with same key, with the value of the latter
        Object.assign(record, attrs);

        return record;
    }

    // DELETE
    deleteFood(id) {
        if (id <= 0 || id > dummyFoodData.length) return "Food id not found";

        dummyFoodData = dummyFoodData.filter(
            (foodData) => foodData.id !== parseInt(id)
        );

        return dummyFoodData;
    }
}

export default FoodRepository;
