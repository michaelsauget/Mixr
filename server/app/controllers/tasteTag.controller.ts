import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { TasteTagService } from "../services/tasteTag.service";
import Types from "../types";

@injectable()
export class TasteTagController {

    public constructor(@inject(Types.TasteTagService) private tasteTagService: TasteTagService) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            res.send(await this.tasteTagService.getAllTags());
        });

        return router;
    }

}
