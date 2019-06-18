
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { iTasteTag, iTasteTagQuery } from "../../../common/interfaces";

import Types from "../types";
import { DatabaseConnectionService } from "./databaseConnection.service";
import { InterfaceBuilder } from "./interfaceBuilder";

// tslint:disable-next-line:variable-name typedef
const Sequelize = require("sequelize");

@injectable()
export class TasteTagService {

    private tasteTag: any;

    public constructor(
        @inject(Types.InterfaceBuilder) private builder: InterfaceBuilder,
        @inject(Types.DatabaseConnectionService) private databaseService: DatabaseConnectionService,
    ) {
        this.defineTasteTag();
    }

    public async getAllTags(): Promise<iTasteTagQuery> {
        return this.tasteTag.findAll({raw: true})
        .then((query: any) => {
            return { hasBeenFound: true, tags: this.getMappedTags(query) };
        })
        .catch((err: Error) => {
            return { hasBeenFound: false };
        });
    }

    private getMappedTags(tagsToMap: any): Map<number, iTasteTag[]> {
        const tagMap: Map<number, iTasteTag[]> = new Map<number, iTasteTag[]>();

        tagsToMap.forEach((tag: any) => {
            const cocktail: iTasteTag[] | undefined = tagMap.get(Number(tag.cocktailno));

            if (cocktail) {
                cocktail.push(this.builder.buildTasteTag(tag));
            } else {
                tagMap.set(Number(tag.cocktailno), [this.builder.buildTasteTag(tag)]);
            }
        });

        return tagMap;
    }

    private defineTasteTag(): void {
        this.tasteTag  = this.databaseService.connection.define(
            "v_cocktailtags",
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
                cocktailno: {
                    type:       Sequelize.STRING,
                },
            },
            {
                schema:             "",
                timestamps:         false,
                freezeTableName:    true,
            });
    }
}
