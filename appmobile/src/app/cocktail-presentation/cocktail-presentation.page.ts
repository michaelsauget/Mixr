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
  
  public cocktail: iCocktail;
  public recipe: iRecipe;

  constructor(private httpClient: HttpClient, public modalController: ModalController) { }

  ngOnInit() {
    this.getRecipe();

    // console.log("\n\nCOMING FROM THE MODAL : \n");
    
    // console.log(this.cocktail);
  }

  public closeModal(): void {
    this.modalController.dismiss();
  }


  
  
  // ngAfterViewInit(): void {
  // }

  private getRecipe(): void {
    this.httpClient.get<iRecipeQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_RECIPE + this.cocktail.cocktailno)
      .subscribe((query: iRecipeQuery) => {
        // console.log(query);
        this.recipe = query.recipe;
        // this.recipe.ingredients.sort((ing1: iIngredient, ing2: iIngredient) => {
        //   return Number(ing1.type) - Number(ing2.type);
        // })
        // console.log(this.recipe);
      });
  }
}
