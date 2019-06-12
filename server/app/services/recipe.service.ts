
import { injectable } from "inversify";
import "reflect-metadata";
import { iIngredient, iRecipe, iRecipeQuery } from "../../../common/interfaces";
import { DatabaseConnectionService } from "./databaseConnection.service";

// tslint:disable-next-line: variable-name no-any
const Sequelize: any = require("sequelize");

@injectable()
export class RecipeService extends DatabaseConnectionService {

    public constructor() {
        super();
    }

    public async getCocktailRecipe(cocktailNo: string): Promise<iRecipeQuery> {
        return this.connection.query(
            // tslint:disable-next-line:max-line-length
            "SELECT mixerr.cocktailingredients.quantity AS quantity, mixerr.preposition.preposition, mixerr.ingredient.ingredientname, mixerr.ingredient.ingredienttypeno FROM Mixerr.cocktailingredients INNER JOIN Mixerr.ingredient ON Mixerr.cocktailingredients.ingredientno = Mixerr.ingredient.ingredientno INNER JOIN Mixerr.ingredientprepositions  ON Mixerr.ingredient.ingredientno = Mixerr.ingredientprepositions.ingredientno INNER JOIN Mixerr.preposition ON Mixerr.ingredientprepositions.prepositionno = Mixerr.preposition.prepositionno INNER JOIN Mixerr.cocktail ON Mixerr.cocktailingredients.cocktailno = Mixerr.cocktail.cocktailno WHERE cocktail.cocktailno = " + "\'" + cocktailNo + "\';",
            { type: Sequelize.QueryTypes.SELECT})
        // tslint:disable-next-line:no-any
        .then((results: any) => {
            return { hasBeenFound: true, recipe: this.recipeBuilder(results, cocktailNo) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false, recipe: undefined };
        });
    }

    private recipeBuilder(foundIngredients: any, cocktailNo: string): iRecipe {
        const ingredients: iIngredient[] = [];

        foundIngredients.forEach((ing: any) => {
            ingredients.push(this.ingredientBuilder(ing));
        });

        return {
            cocktailno:     cocktailNo,
            ingredients:    ingredients,
        } as iRecipe;
    }

    public ingredientBuilder(ingredient: any): iIngredient {
        return {
            quantity:       ingredient.quantity,
            preposition:    ingredient.preposition,
            aliment:        ingredient.ingredientname,
            type:           ingredient.ingredienttype,
        } as iIngredient;
    }

}
