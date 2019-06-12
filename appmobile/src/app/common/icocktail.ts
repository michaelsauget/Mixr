export interface Cocktail {
    clicked:        boolean;
    name:           string;
    tags:           string,
    price:          number;
    photoUrl:       string;
    preparation:    string;
    decoration:     string;
    ingredients:    Ingredient[];
}


interface Ingredient {
    amount:         string;
    ingredient:     string;
}
