export interface iCocktail {
    cocktailno:     string;
    name:           string;
    price:          string; // a changer
    photourl:       string;
    preparation:    string;
    decoration:     string;
}

export interface iCocktailQuery {
    hasBeenFound:   boolean;
    cocktail?:      iCocktail[];
}

export interface iRecipeQuery {
    hasBeenFound:   boolean,
    recipe:         iRecipe,
}

export interface iRecipe {
    cocktailno:     string;
    ingredients:    iIngredient[]; 
}

export interface iIngredient {
    quantity:       number;
    preposition:    string;
    aliment:        string;
    type:           string;
}

export interface iTasteTag {
    taste:            string;
}

export interface iTasteTagQuery {
    hasBeenFound:   boolean;
    tags:           iTasteTag[];
}