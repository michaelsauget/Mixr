import { Component, OnInit } from '@angular/core';
import { iCocktail, iRecipe, iRecipeQuery } from '../../../../common/interfaces';
import { ModalController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../../../../common/constants';

@Component({
  selector: 'app-cocktail-presentation',
  templateUrl: './cocktail-presentation.page.html',
  styleUrls: ['./cocktail-presentation.page.scss'],
})
export class CocktailPresentationPage implements OnInit {
  
  public cocktail:  iCocktail;
  public recipe:    iRecipe;

  constructor(private httpClient: HttpClient, public modalController: ModalController) { }

  ngOnInit() {
    this.getRecipe();
  }

  public closeModal(): void {
    this.modalController.dismiss();
  }

  private getRecipe(): void {
    this.httpClient.get<iRecipeQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_RECIPE + "cocktailno/" +  this.cocktail.cocktailno)
      .subscribe((query: iRecipeQuery) => {
        this.recipe = query.foundRecipe;
        
        // this.recipe.ingredients.sort((ing1: iIngredient, ing2: iIngredient) => {
        //   return Number(ing1.type) - Number(ing2.type);
        // })
      });
  }
}
