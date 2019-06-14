import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";

import { CocktailController } from "./controllers/cocktail.controller";
import { CocktailService } from "./services/cocktail.service";

import { DatabaseConnectionService } from "./services/databaseConnection.service";

import { RecipeController } from "./controllers/recipe.controller";
import { RecipeService } from "./services/recipe.service";

import { TasteTagController } from "./controllers/tasteTag.controller";
import { TasteTagService } from "./services/tasteTag.service";

import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.CocktailController).to(CocktailController);
container.bind(Types.CocktailService).to(CocktailService);

container.bind(Types.RecipeController).to(RecipeController);
container.bind(Types.RecipeService).to(RecipeService);

container.bind(Types.TasteTagController).to(TasteTagController);
container.bind(Types.TasteTagService).to(TasteTagService);

container.bind(Types.DatabaseConnectionService).to(DatabaseConnectionService).inSingletonScope();

export { container };
