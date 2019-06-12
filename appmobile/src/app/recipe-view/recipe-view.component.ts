import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { iCocktail, iRecipe, iRecipeQuery, iIngredient } from '../../../../common/interfaces';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../../../../common/constants';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements AfterViewInit {
  
  @Input() public cocktailToDisplay: iCocktail;
  @Output() leaveRecipeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  // @ViewChild('recipeDisplay') recipeDisplay: HTMLDivElement;
  
  public recipe: iRecipe;
  
  constructor(private httpClient: HttpClient) { }
  
  ngAfterViewInit(): void {
    this.getRecipe();
  }

  private getRecipe(): void {
    this.httpClient.get<iRecipeQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_RECIPE + this.cocktailToDisplay.cocktailno)
      .subscribe((query: iRecipeQuery) => {
        // console.log(query);
        this.recipe = query.recipe;
        // this.recipe.ingredients.sort((ing1: iIngredient, ing2: iIngredient) => {
        //   return Number(ing1.type) - Number(ing2.type);
        // })
        // console.log(this.recipe);
      });
  }

  public leaveRecipeView(): void {
    this.leaveRecipeEmitter.emit();
  }


}
