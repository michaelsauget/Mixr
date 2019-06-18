
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Constants } from "../../../common/constants";
import { iCocktail, iCocktailQuery, iTasteTag, iTasteTagQuery } from "../../../common/interfaces";
import { DatabaseConnectionService } from "./databaseConnection.service";
import { InterfaceBuilder } from "./interfaceBuilder";

import { TasteTagService } from "./tasteTag.service";

import Types from "../types";

// tslint:disable-next-line:variable-name typedef
const Sequelize = require("sequelize");

const cocktailTableName: string = "cocktail";


/******** A ENELVER *****************/
// import { BuildOptions, DataTypes, Model } from "sequelize";

// interface MyModel extends Model {
//     readonly id: number;
//   }
/***********************************/

@injectable()
export class CocktailService {

    // tslint:disable-next-line:no-any
    private cocktail: any;
    // private tasteTag: any;

    // private MyModelStatic: MyModel;
    // private MyDefineModel: MyModelStatic;

    // public petpet(): void {
    //     // Need to declare the static model so `findOne` etc. use correct types.
    //     type MyModelStatic = typeof Model & {
    //       new (values?: object, options?: BuildOptions): MyModel;
    //     };


    //     // TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
    //     this.MyDefineModel = this.connection.define("MyDefineModel", {
    //         id: {
    //             primaryKey: true,
    //             type:       DataTypes.INTEGER.UNSIGNED,
    //         }
    //     }) as MyModelStatic;
    // }

    // public stuffTwo(): void {
    //     this.MyDefineModel.findByPk(1, {
    //         rejectOnEmpty: true,
    //     })
    //     .then((myModel: any) => {
    //         //   console.log(myModel.id);
    //     });
    // }

    public constructor(
        @inject(Types.InterfaceBuilder)             private builder:            InterfaceBuilder,
        @inject(Types.TasteTagService)              private tasteTagService:    TasteTagService,
        @inject(Types.DatabaseConnectionService)    private databaseService:    DatabaseConnectionService) {
        this.defineCocktail();
    }

    public async getAll(): Promise<iCocktailQuery> {
        return this.cocktail.findAll()
        .then(async (foundCocktails: any) => {
            const tagQuery: iTasteTagQuery  = await this.tasteTagService.getAllTags();
            const cocktails: iCocktail[]    = this.getCocktailsArray(foundCocktails, tagQuery.tags);

            return { hasBeenFound: true, cocktail: cocktails };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false, cocktail: undefined };
        });
    }

    public async searchByName(entry: string): Promise<iCocktailQuery>  {
        const Op: any = Sequelize.Op;

        return this.cocktail.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + entry + "%",
                },
            },
        })
        .then((foundCocktails: any) => {
            return { hasBeenFound: true, cocktail: this.getCocktailsArray(foundCocktails) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false };
        });    }

    public async getById(id: string): Promise<iCocktailQuery> {
        return this.cocktail.findByPk(id)
        .then((foundCocktail: any) => {
            return { hasBeenFound: true, cocktail: this.builder.buildCocktail(foundCocktail) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false };
        });
    }

    private defineCocktail(): void {
        this.cocktail  = this.databaseService.connection.define(
            cocktailTableName,
            {   // attributes
                cocktailno: {
                    type:       Sequelize.STRING,
                    allowNull:  false,
                    primaryKey: true,
                },
                name: {
                    type:       Sequelize.STRING,
                    allowNull:  false,
                },
                price:          { type: Sequelize.FLOAT  },
                photourl:       { type: Sequelize.STRING },
                preparation:    { type: Sequelize.TEXT   },
                decoration:     { type: Sequelize.TEXT   },
            },
            {
                schema:             Constants.DATABASE_SCHEMA,
                timestamps:         false,
                freezeTableName:    true,
            });
    }

    private getCocktailsArray(
        foundCocktails: any,
        foundTags: Map<number, iTasteTag[]> = new Map<number, iTasteTag[]>()
    ): iCocktail[] {
        const cocktails: iCocktail[] = [];

        foundCocktails.forEach((cocktail: any) => {
            const tags: iTasteTag[] | undefined = foundTags.get(Number(cocktail.cocktailno));
            cocktails.push(this.builder.buildCocktail(cocktail, tags));
        });

        return cocktails;
    }
}
