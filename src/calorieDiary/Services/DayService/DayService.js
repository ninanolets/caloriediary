import HttpError from "../../Errors/HttpError.js";
import Day from "../../Models/Day.js";

export default class DayService {
    create(attrs) {
        const { kcalGoal, proteinGoal, fatGoal, carbsGoal, date } = attrs;

        const day = new Day(kcalGoal, proteinGoal, fatGoal, carbsGoal, date);
        day.save();

        return day;
    }

    get(dayId) {
        const day = Day.getOneById(dayId);

        if (!day) {
            throw new HttpError(`Day with id: ${dayId} not found.`, 404);
        }

        return day;
    }

    update() {}
    delete() {}
}
