import ActiveRecord from "../Repositories/ActiveRecord.js";

export default class Meal extends ActiveRecord {
    constructor(dayId, name) {
        super();
        this.dayId = dayId;
        this.name = name;
    }
}
