import ActiveRecord from "../Repositories/ActiveRecord.js";

export default class NutritionalInformation extends ActiveRecord {
    constructor(
        foodId,
        portionInGrams,
        proteinPerPortion,
        carbsPerPortion,
        fatPerPortion,
        kcalPerPortion
    ) {
        super();
        this.foodId = foodId;
        this.portionInGrams = portionInGrams;
        this.proteinPerPortion = proteinPerPortion;
        this.carbsPerPortion = carbsPerPortion;
        this.fatPerPortion = fatPerPortion;
        this.kcalPerPortion = kcalPerPortion;
    }
}
