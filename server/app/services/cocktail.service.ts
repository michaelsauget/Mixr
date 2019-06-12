
import { injectable } from "inversify";
import "reflect-metadata";

import { Constants } from "../../../common/constants";
import { iCocktail, iCocktailQuery, iTasteTag } from "../../../common/interfaces";
import { DatabaseConnectionService } from "./databaseConnection.service";

// tslint:disable-next-line:variable-name typedef
const Sequelize = require("sequelize");

const cocktailTableName: string = "cocktail";
const tasteTagTableName: string = "tastetag";

@injectable()
export class CocktailService extends DatabaseConnectionService {

    // tslint:disable-next-line:no-any
    private cocktail: any;
    private tasteTag: any;

    public constructor() {
        super();
        this.defineCocktail();
        this.defineTasteTag();
    }

    public async getAll(): Promise<iCocktailQuery> {
        return this.cocktail.findAll()
        .then((foundCocktails: any) => {
            return { hasBeenFound: true, cocktail: this.getCocktailsArray(foundCocktails) };
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
            return { hasBeenFound: false, cocktail: undefined };
        });    }

    public async getById(id: string): Promise<iCocktailQuery> {
        return this.cocktail.findByPk(id)
        .then((foundCocktail: any) => {
            return { hasBeenFound: true, cocktail: this.cocktailBuilder(foundCocktail) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false, cocktail: undefined };
        });
    }

    public async getAllTasteTags(): Promise<iTasteTag[]> {
        return this.tasteTag.findAll()
        .then((foundTags: any) => {
            return { hasBeenFound: true, tags: this.getTagsArray(foundTags) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false, tags: undefined };
        });
    }

    private defineCocktail(): void {
        this.cocktail  = this.connection.define(
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

    private getCocktailsArray(foundCocktail: any): iCocktail[] {
        const cocktails: iCocktail[] = [];

        foundCocktail.forEach((cocktail: any) => {
            cocktails.push(this.cocktailBuilder(cocktail));
        });

        return cocktails;
    }

    public cocktailBuilder(cocktailToBuild: any): iCocktail {
        return {
            cocktailno:     cocktailToBuild.cocktailno,
            name:           cocktailToBuild.name,
            price:          cocktailToBuild.price,
            photourl:       cocktailToBuild.photourl,
            preparation:    cocktailToBuild.preparation,
            decoration:     cocktailToBuild.decoration,
        } as iCocktail;
    }

    private defineTasteTag(): void {
        this.tasteTag  = this.connection.define(
            tasteTagTableName,
            {   // attributes
                tagno: {
                    type:       Sequelize.STRING,
                    allowNull:  false,
                    primaryKey: true,
                },
                taste: {
                    type:       Sequelize.STRING,
                    allowNull:  false,
                },
            },
            {
                schema:             Constants.DATABASE_SCHEMA,
                timestamps:         false,
                freezeTableName:    true,
            });
    }

    private getTagsArray(foundTags: any): iTasteTag[] {
        const tags: iTasteTag[] = [];

        foundTags.forEach((tag: any) => {
            tags.push(this.tagBuilder(tag));
        });

        return tags;
    }

    public tagBuilder(tag: any): iTasteTag {
        return { taste: tag.taste } as iTasteTag;
    }

}
