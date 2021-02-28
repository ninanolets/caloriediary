import ActiveRecord from "../Repositories/ActiveRecord.js";

export default class Day extends ActiveRecord {
    constructor(kcalGoal, proteinGoal, fatGoal, carbsGoal, date) {
        super();
        this.kcalGoal = kcalGoal;
        this.proteinGoal = proteinGoal;
        this.fatGoal = fatGoal;
        this.carbsGoal = carbsGoal;
        this.date = date;
    }
}
