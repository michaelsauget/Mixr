DROP SCHEMA IF EXISTS Mixerr CASCADE;
CREATE SCHEMA Mixerr;

/* Recueil les cocktails et leurs informations  FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.Cocktail (
  cocktailno        VARCHAR(10)   PRIMARY KEY,
  name              VARCHAR(100)   NOT NULL,
  price             VARCHAR(10),
  photourl          VARCHAR(140) DEFAULT 'placeholder.png',
  preparation       VARCHAR(200),
  decoration        VARCHAR(200)
);

/* Recueil des pastilles de goût (Sucré, salé, sour, etc) FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.TasteTag (
  tagNo             VARCHAR(10)   PRIMARY KEY,
  taste             VARCHAR(10)   NOT NULL
);

/* Recueil des types d'ingrédients (Fruit, Alcool, Bitters, etc) FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.IngredientType (
  typeNo            VARCHAR(10)   PRIMARY KEY,
  ingredientType    VARCHAR(20)   NOT NULL
);


/* Recueil des ingrédients (Sirop de basilic, St-Germain, etc) FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.Ingredient (
  ingredientNo      VARCHAR(10)   PRIMARY KEY,
  ingredientTypeNo  VARCHAR(10)   NOT NULL,
  ingredientName    VARCHAR(50)   NOT NULL,
  FOREIGN KEY (ingredientTypeNo) REFERENCES Mixerr.IngredientType (typeNo)
);

/* Recueil de toutes les prépositions FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.Preposition (
  prepositionNo     VARCHAR(10)   PRIMARY KEY,
  preposition       VARCHAR(20)   NOT NULL
);

/* Association prépositions/ingredients FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.IngredientPrepositions (
  ingredientNo      VARCHAR(10),
  prepositionNo     VARCHAR(10),
  FOREIGN KEY (ingredientNo)  REFERENCES Mixerr.Ingredient  (ingredientNo),
  FOREIGN KEY (prepositionNo) REFERENCES Mixerr.Preposition (prepositionNo)
);

/* Association ingredients/cocktails  FAIT */
CREATE TABLE IF NOT EXISTS Mixerr.CocktailIngredients (
  cocktailNo      VARCHAR(10),
  ingredientNo    VARCHAR(10),
  quantity        FLOAT,
  FOREIGN KEY (cocktailNo)    REFERENCES Mixerr.Cocktail    (cocktailNo),
  FOREIGN KEY (ingredientNo)  REFERENCES Mixerr.Ingredient  (ingredientNo)
);

/* Association cocktails/tasteTag  FAIT*/
CREATE TABLE IF NOT EXISTS Mixerr.CocktailTasteTags (
  cocktailNo      VARCHAR(10),
  tasteTagNo      VARCHAR(10),
  FOREIGN KEY (cocktailNo) REFERENCES Mixerr.Cocktail (cocktailNo),
  FOREIGN KEY (tasteTagNo) REFERENCES Mixerr.TasteTag (tagNo)
);