import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { TasteTagController } from "./controllers/TasteTag.controller";
import { CocktailController } from "./controllers/cocktail.controller";
import { RecipeController   } from "./controllers/recipe.controller";

import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(
        @inject(Types.CocktailController)   private cocktailController: CocktailController,
        @inject(Types.RecipeController)     private recipeController:   RecipeController,
        @inject(Types.TasteTagController)   private tasteTagController: TasteTagController,
    ) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.static("./app/asset"));
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use("/api/cocktail",   this.cocktailController.router);
        this.app.use("/api/recipe",     this.recipeController.router);
        this.app.use("/api/tag",        this.tasteTagController.router);

        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
