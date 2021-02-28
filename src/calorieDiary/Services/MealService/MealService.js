class MealService {
    getFoodsArray(resString) {
        return resString.split(",").map((el) => {
            return (
                el.trim().slice(0, 1).toUpperCase() +
                el.trim().slice(1, el.length).toLowerCase()
            );
        });
    }
}

export default MealService;
