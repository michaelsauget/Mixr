import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { CocktailService } from "../services/cocktail.service";
import Types from "../types";

@injectable()
export class CocktailController {

    public constructor(@inject(Types.CocktailService) private cocktailService: CocktailService) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            res.send(await this.cocktailService.getAll());
        });

        router.get("/searchById/:id", async (req: Request, res: Response, next: NextFunction) => {
            res.send(await this.cocktailService.getById(req.params.id));
        });

        router.get("/searchByName/:entry", async (req: Request, res: Response, next: NextFunction) => {
            res.send(await this.cocktailService.searchByName(req.params.entry));
        });

        return router;
    }

}
