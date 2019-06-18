import { injectable } from "inversify";
import { iCocktail, iTasteTag } from "../../../common/interfaces";

@injectable()
export class InterfaceBuilder {

    public buildCocktail(cocktailToBuild: any, tasteTag: iTasteTag[] = []): iCocktail {
        return {
            cocktailno:     cocktailToBuild.cocktailno,
            name:           cocktailToBuild.name,
            price:          cocktailToBuild.price,
            photourl:       cocktailToBuild.photourl,
            preparation:    cocktailToBuild.preparation,
            decoration:     cocktailToBuild.decoration,
            tasteTags:      tasteTag,
        } as iCocktail;
    }

    public buildTasteTag(tagToBuild: any): iTasteTag {
        return {
            tagNo:          tagToBuild.tagno,
            taste:          tagToBuild.taste,
        } as iTasteTag;
    }

}
