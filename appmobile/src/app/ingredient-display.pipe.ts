import { Pipe, PipeTransform } from '@angular/core';
import { iIngredient } from '../../../common/interfaces';

@Pipe({
  name: 'ingredientDisplay'
})
export class IngredientDisplayPipe implements PipeTransform {

  transform(ingredient: iIngredient): string {
    return "hello";
  }

}
