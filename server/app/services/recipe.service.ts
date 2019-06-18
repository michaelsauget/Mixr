
import "reflect-metadata";

import { inject, injectable } from "inversify";
import { iCocktailIngredient, iIngredient, iIngredientType, iRecipe, iRecipeQuery } from "../../../common/interfaces";
import { DatabaseConnectionService } from "./databaseConnection.service";

import Types from "../types";

// tslint:disable-next-line: variable-name no-any
const Sequelize: any = require("sequelize");

@injectable()
export class RecipeService {

    public constructor(@inject(Types.DatabaseConnectionService) private databaseService: DatabaseConnectionService)  {
    }

    public async getCocktailRecipe(cocktailNo: string): Promise<iRecipeQuery> {
        return this.databaseService.connection.query(
            // tslint:disable-next-line:max-line-length
            "SELECT cockIng.quantity AS quantity, ing.ingredientno, ing.ingredientname, prep.preposition, ing.ingredienttypeno, ingT.ingredienttype\
            FROM Mixerr.cocktailingredients AS cockIng\
            INNER JOIN Mixerr.ingredient AS ing ON cockIng.ingredientno = ing.ingredientno\
            INNER JOIN Mixerr.ingredientprepositions AS ingPrep ON ing.ingredientno = ingPrep.ingredientno\
            INNER JOIN Mixerr.preposition AS prep ON ingPrep.prepositionno = prep.prepositionno\
            INNER JOIN Mixerr.cocktail AS cock ON cockIng.cocktailno = cock.cocktailno\
            INNER JOIN Mixerr.ingredienttype AS ingT ON ing.ingredienttypeno = ingT.typeno\
            WHERE cock.cocktailno = " + "\'" + cocktailNo + "\';",
            { type: Sequelize.QueryTypes.SELECT})
        // tslint:disable-next-line:no-any
        .then((results: any) => {
            return { hasBeenFound: true, foundRecipe: this.recipeBuilder(results, cocktailNo) } as iRecipeQuery;
        })
        .catch((err: Error) => {
            return { hasBeenFound: false } as iRecipeQuery;
        });
    }

    private recipeBuilder(foundIngredients: any, cocktailNo: string): iRecipe {
        const cocktailIngredients: iCocktailIngredient[] = [];

        foundIngredients.forEach((ing: any) => {
            cocktailIngredients.push(this.cocktailIngredientBuilder(ing));
        });

        return {
            cocktailno:             cocktailNo,
            cocktailIngredients:    cocktailIngredients,
        } as iRecipe;
    }

    public cocktailIngredientBuilder(ingredient: any): iCocktailIngredient {
        return {
            quantity:       ingredient.quantity,
            ingredient: {
                ingredientNo:   ingredient.ingredientno,
                ingredientName: ingredient.ingredientname,
                preposition:    ingredient.preposition,
                ingredientType: {
                    typeno: ingredient.ingredienttypeno,
                    type:   ingredient.ingredienttype,
                } as iIngredientType,
            } as iIngredient,
        } as iCocktailIngredient;
    }

}
