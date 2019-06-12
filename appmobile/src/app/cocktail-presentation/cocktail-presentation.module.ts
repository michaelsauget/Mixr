import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CocktailPresentationPage } from './cocktail-presentation.page';

const routes: Routes = [
  {
    path: '',
    component: CocktailPresentationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CocktailPresentationPage]
})
export class CocktailPresentationPageModule {}
