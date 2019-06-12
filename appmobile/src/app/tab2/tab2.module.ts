import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CocktailThumbnailComponent } from '../cocktail-thumbnail/cocktail-thumbnail.component';
import { RecipeViewComponent } from "../recipe-view/recipe-view.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [
    Tab2Page,
    CocktailThumbnailComponent,
    RecipeViewComponent
  ]
})
export class Tab2PageModule {}
