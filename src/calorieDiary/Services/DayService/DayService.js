import HttpError from "../../Errors/HttpError.js";

import Day from "../../Models/Day.js";
import Meal from "../../Models/Meal.js";
import FoodPortion from "../../Models/FoodPortion.js";
import NutritionalInformation from "../../Models/NutritionalInformation.js";

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

    getMacros(dayId) {
        const day = Day.getOneById(dayId);

        if (!day) {
            throw new HttpError(`Day with id: ${dayId} not found.`, 404);
        }

        const mealsOfDay = Meal.getByFilter("dayId", dayId);

        const { foodPortions, foodInfos } = this.allNutriInfos(mealsOfDay);

        const currentMacros = this.getCurrentMacros(foodPortions, foodInfos);

        const macrosLeft = {
            kcalLeft: day.kcalGoal - currentMacros.kcalPerDay,
            proteinLeft: day.proteinGoal - currentMacros.proteinPerDay,
            fatLeft: day.fatGoal - currentMacros.fatPerDay,
            carbsLeft: day.carbsGoal - currentMacros.carbsPerDay,
        };

        return macrosLeft;
    }

    allNutriInfos(mealsOfDay) {
        const recordFoodPortion = {};

        const foodNutriInfos = mealsOfDay
            .map((meal) => meal.id)
            .map((mealId) => {
                const foodPortions = FoodPortion.getByFilter("mealId", mealId);

                return foodPortions;
            })
            .flat()
            .map((foodPortion) => {
                const { foodId, quantityInGrams } = foodPortion;
                recordFoodPortion[foodId] = quantityInGrams;

                return foodId;
            })
            .map((foodId) => {
                const nutriInfo = NutritionalInformation.getByFilter("foodId", foodId);

                return nutriInfo;
            });

        const allInfo = {
            foodInfos: foodNutriInfos.map((food) => food[0]),
            foodPortions: recordFoodPortion,
        };

        return allInfo;
    }

    getCurrentMacros(foodPortions, foodInfos) {
        const currentMacros = {
            proteinPerDay: 0,
            carbsPerDay: 0,
            fatPerDay: 0,
            kcalPerDay: 0,
        };

        foodInfos.map((foodInfo) => {
            for (const foodPortion in foodPortions) {
                if (parseInt(foodPortion) === foodInfo.foodId) {
                    currentMacros.proteinPerDay += parseInt(
                        (foodPortions[foodPortion] * foodInfo.proteinPerPortion) /
                            foodInfo.portionInGrams
                    );
                    currentMacros.carbsPerDay += parseInt(
                        (foodPortions[foodPortion] * foodInfo.carbsPerPortion) /
                            foodInfo.portionInGrams
                    );
                    currentMacros.fatPerDay += parseInt(
                        (foodPortions[foodPortion] * foodInfo.fatPerPortion) /
                            foodInfo.portionInGrams
                    );
                    currentMacros.kcalPerDay += parseInt(
                        (foodPortions[foodPortion] * foodInfo.kcalPerPortion) /
                            foodInfo.portionInGrams
                    );
                }
            }
        });

        return currentMacros;
    }

    update(dayId, attrs) {
        const oldDayInfo = this.get(dayId);
        const updatedDay = { ...oldDayInfo, ...attrs };
        Day.update(updatedDay);

        return updatedDay;
    }

    delete(dayId) {
        this.get(dayId);
        Day.delete(dayId);
    }
}
