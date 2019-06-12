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
ici on aimerait avoir :
            quantity:       ingredient.quantity,
            ingredient: {
                ingredientNo: "",
                ingredientName:        ingredient.ingredientname,
                preposition:    ingredient.preposition,
                ingredientType: {
                    typeno:     "",
                    type:       ingredient.ingredienttype,
                } as iIngredientType,
            } as iIngredient,
        } as iCocktailIngredient;

Donc : quantity, ingredientno, ingredientName, preposition, typeno, type
*/
SELECT cockIng.quantity AS quantity, ing.ingredientno, ing.ingredientname, prep.preposition, ing.ingredienttypeno, ingT.ingredienttype
FROM Mixerr.cocktailingredients AS cockIng
INNER JOIN Mixerr.ingredient AS ing                 ON cockIng.ingredientno   = ing.ingredientno
INNER JOIN Mixerr.ingredientprepositions AS ingPrep ON ing.ingredientno       = ingPrep.ingredientno
INNER JOIN Mixerr.preposition AS prep               ON ingPrep.prepositionno  = prep.prepositionno
INNER JOIN Mixerr.cocktail AS cock                  ON cockIng.cocktailno     = cock.cocktailno
INNER JOIN Mixerr.ingredienttype AS ingT            ON ing.ingredienttypeno   = ingT.typeno
WHERE cock.cocktailno = '33';




/* récupérer tous les ingrédients avec toutes leurs infos
 on veut:
 ingredientno, ingredientname, ingredienttype, ingredienttypeno, preposition
 */

SELECT ing.ingredientno, ing.ingredientname, ing.ingredienttypeno, ingType.ingredienttype, prep.preposition
FROM Mixerr.ingredient AS ing
INNER JOIN Mixerr.ingredienttype AS ingType ON ing.ingredienttypeno = ingType.typeno
INNER JOIN Mixerr.ingredientprepositions AS ingPrep ON ing.ingredientno = ingPrep.ingredientno
INNER JOIN Mixerr.preposition AS prep ON ingPrep.prepositionno = prep.prepositionno




