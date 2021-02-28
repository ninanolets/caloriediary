import ActiveRecord from "../Repositories/ActiveRecord.js";

export default class Food extends ActiveRecord {
    constructor(name) {
        super();
        this.name = name;
    }
}
