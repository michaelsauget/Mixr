SELECT name FROM Mixerr.Cocktail;


SELECT COUNT(*) FROM Mixerr.ingredient;


SELECT * FROM Mixerr.ingredient
WHERE ingredientname LIKE '%sirop%';



SELECT cocktailingredients.quantity, ingredientname FROM Mixerr.Ingredient
WHERE ingredientno IN (
  SELECT cocktailingredients.quantity AS quantity, cocktailingredients.ingredientno FROM Mixerr.cocktailingredients
  WHERE cocktailno = '3'
  );


SELECT mixerr.cocktailingredients.quantity / 4.0, mixerr.ingredient.ingredientname
FROM mixerr.cocktailingredients
INNER JOIN mixerr.ingredient
ON mixerr.cocktailingredients.ingredientno = mixerr.ingredient.ingredientno
WHERE mixerr.cocktailingredients.cocktailno = '27';




/* Présente les noms des ingrédients avec le nom de leur type (Alcool, Bourbon) */
SELECT Mixerr.ingredienttype.ingredienttype, Mixerr.ingredient.ingredientname
FROM Mixerr.ingredient
INNER JOIN Mixerr.ingredienttype
ON Mixerr.ingredienttype.typeno = Mixerr.ingredient.ingredienttypeno
ORDER BY ingredienttype.ingredienttype;


/*
On a les tables :
  - cocktailIngredient      (cocktailNo, ingredientNo, quantity)
  - ingredient              (ingredientNo,   ingredientTypeNo,  ingredientName)
  - preposition             (prepositionNo, preposition)
  - ingredientPreposition   (ingredientNo,  prepositionNo)


on veut ->

  cocktailIngredient.quantity,
  preposition.preposition,
  ingredient.ingredientName

pour tous les cocktailIngredient


donc on part de cocktailIngredient -> ingredient -> ingredientPreposition -> Preposition
 */

SELECT mixerr.cocktailingredients.quantity AS quantity, mixerr.preposition.preposition, mixerr.ingredient.ingredientname, mixerr.ingredient.ingredienttypeno
FROM Mixerr.cocktailingredients
INNER JOIN Mixerr.ingredient              ON Mixerr.cocktailingredients.ingredientno = Mixerr.ingredient.ingredientno
INNER JOIN Mixerr.ingredientprepositions  ON Mixerr.ingredient.ingredientno = Mixerr.ingredientprepositions.ingredientno
INNER JOIN Mixerr.preposition             ON Mixerr.ingredientprepositions.prepositionno = Mixerr.preposition.prepositionno
INNER JOIN Mixerr.cocktail                ON Mixerr.cocktailingredients.cocktailno = Mixerr.cocktail.cocktailno
-- INNER JOIN Mixerr.ingredienttype          ON Mixerr.ingredient.ingredienttypeno = Mixerr.ingredienttype.typeno
WHERE cocktail.cocktailno = '33';



