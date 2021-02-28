import NutritionalInformationController from "../../Controllers/NutriInfoController/NutritionalInformationController.js";
import HttpError from "../../Errors/HttpError.js";
import NutritionalInformation from "../../Models/NutritionalInformation.js";

export default class NutritionalInformationService {
    create(foodId, attrs) {
        const {
            portionInGrams,
            proteinPerPortion,
            carbsPerPortion,
            fatPerPortion,
            kcalPerPortion,
        } = attrs;

        const nutriInfo = new NutritionalInformation(
            foodId,
            portionInGrams,
            proteinPerPortion,
            carbsPerPortion,
            fatPerPortion,
            kcalPerPortion
        );

        nutriInfo.save();

        return nutriInfo;
    }

    getInfo(foodId) {
        const nutri = NutritionalInformation.getOneByFilter("foodId", foodId);

        if (!nutri) {
            throw new HttpError(`Could not find nutritional information of food with id ${foodId}`);
        }

        return nutri;
    }
}
