import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { RecipeService } from "../services/recipe.service";
import Types from "../types";

@injectable()
export class RecipeController {

    public constructor(@inject(Types.RecipeService) private recipeService: RecipeService) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get("/cocktailNo/:cocktailno", async (req: Request, res: Response, next: NextFunction) => {
            res.send(await this.recipeService.getCocktailRecipe(req.params.cocktailno));
        });

        return router;
    }

}
