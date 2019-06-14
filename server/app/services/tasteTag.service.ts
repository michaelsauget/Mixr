
import { injectable } from "inversify";
import "reflect-metadata";
// import { iCocktailIngredient, iIngredient, iIngredientType, iRecipe, iRecipeQuery } from "../../../common/interfaces";
import { DatabaseConnectionService } from "./databaseConnection.service";
// import { iTasteTag, iTasteTagQuery } from "../../../common/interfaces";

// tslint:disable-next-line: variable-name no-any
// const Sequelize: any = require("sequelize");

@injectable()
export class TasteTagService extends DatabaseConnectionService {

    public constructor() {
        super();
    }
    public async getAllTags(): Promise<void> { /* */ }

    // public async getAllTags(): Promise<iTasteTagQuery> {
        // return this.connection.query(
            // tslint:disable-next-line:max-line-length
            // "SELECT cockIng.quantity AS quantity, ing.ingredientno, ing.ingredientname, prep.preposition, ing.ingredienttypeno, ingT.ingredienttype FROM Mixerr.cocktailingredients AS cockIng INNER JOIN Mixerr.ingredient AS ing ON cockIng.ingredientno   = ing.ingredientno INNER JOIN Mixerr.ingredientprepositions AS ingPrep ON ing.ingredientno = ingPrep.ingredientno INNER JOIN Mixerr.preposition AS prep ON ingPrep.prepositionno = prep.prepositionno INNER JOIN Mixerr.cocktail AS cock ON cockIng.cocktailno = cock.cocktailno INNER JOIN Mixerr.ingredienttype AS ingT ON ing.ingredienttypeno = ingT.typeno WHERE cock.cocktailno = " + "\'" + cocktailNo + "\';",
            // { type: Sequelize.QueryTypes.SELECT})
        // tslint:disable-next-line:no-any
        // .then((results: any) => {
            // return { hasBeenFound: true, foundRecipe: this.tasteTagBuilder(results, cocktailNo) } as iTasteTagQuery;
        // })
        // .catch((err: Error) => {
            // return { hasBeenFound: false } as iTasteTagQuery;
        // });
    // }

    // public async getCocktailRecipe(cocktailNo: string): Promise<iRecipeQuery> {
    //     return this.connection.query(
            // tslint:disable-next-line:max-line-length
    //         "SELECT cockIng.quantity AS quantity, ing.ingredientno, ing.ingredientname, prep.preposition, ing.ingredienttypeno, ingT.ingredienttype FROM Mixerr.cocktailingredients AS cockIng INNER JOIN Mixerr.ingredient AS ing ON cockIng.ingredientno   = ing.ingredientno INNER JOIN Mixerr.ingredientprepositions AS ingPrep ON ing.ingredientno = ingPrep.ingredientno INNER JOIN Mixerr.preposition AS prep ON ingPrep.prepositionno = prep.prepositionno INNER JOIN Mixerr.cocktail AS cock ON cockIng.cocktailno = cock.cocktailno INNER JOIN Mixerr.ingredienttype AS ingT ON ing.ingredienttypeno = ingT.typeno WHERE cock.cocktailno = " + "\'" + cocktailNo + "\';",
    //         { type: Sequelize.QueryTypes.SELECT})
    //     // tslint:disable-next-line:no-any
    //     .then((results: any) => {
    //         return { hasBeenFound: true, foundRecipe: this.recipeBuilder(results, cocktailNo) } as iRecipeQuery;
    //     })
    //     .catch((err: Error) => {
    //         return { hasBeenFound: false } as iRecipeQuery;
    //     });
    // }

    // private tasteTagBuilder(foundTags: any): iRecipe {
    //     const cocktailIngredients: iTasteTag[] = [];

    //     foundIngredients.forEach((ing: any) => {
    //         cocktailIngredients.push();
    //     });

    //     return {
    //         cocktailno:             cocktailNo,
    //         cocktailIngredients:    cocktailIngredients,
    //     } as iRecipe;
    // }

    // public cocktailIngredientBuilder(ingredient: any): iCocktailIngredient {
    //     return {
    //         quantity:       ingredient.quantity,
    //         ingredient: {
    //             ingredientNo:   ingredient.ingredientno,
    //             ingredientName: ingredient.ingredientname,
    //             preposition:    ingredient.preposition,
    //             ingredientType: {
    //                 typeno: ingredient.typeno,
    //                 type:   ingredient.ingredienttype,
    //             } as iIngredientType,
    //         } as iIngredient,
    //     } as iCocktailIngredient;
    // }

}