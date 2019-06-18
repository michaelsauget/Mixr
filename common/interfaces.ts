export interface iCocktail {
    cocktailno:     string;
    name:           string;
    price:          string; // a changer
    photourl:       string;
    preparation:    string;
    decoration:     string;
    tasteTags:      iTasteTag[];
}

export interface iCocktailQuery {
    hasBeenFound:   boolean;
    cocktail?:      iCocktail[];
}

export interface iRecipeQuery {
    hasBeenFound:   boolean,
    foundRecipe?:   iRecipe,
}

export interface iRecipe {
    cocktailno:             string;
    cocktailIngredients:    iCocktailIngredient[]; 
}

export interface iCocktailIngredient {
    quantity:       number;
    ingredient:     iIngredient;
}

export interface iIngredient {
    ingredientNo:   string;
    ingredientName: string;
    preposition:    string;
    ingredientType: iIngredientType;
}

export interface iIngredientType {
    typeno:         string;
    type:           string;
}

export interface iTasteTag {
    tagNo:          string;
    taste:          string;
}

export interface iTasteTagQuery {
    hasBeenFound:   boolean;
    tags?:          Map<number, iTasteTag[]>;
}