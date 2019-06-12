import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { iCocktail } from "../../../../common/interfaces";

@Component({
  selector: 'app-cocktail-thumbnail',
  templateUrl: './cocktail-thumbnail.component.html',
  styleUrls: ['./cocktail-thumbnail.component.scss'],
})
export class CocktailThumbnailComponent implements OnInit {

  @Input() public cocktail: iCocktail;
  @Output() viewRecipeEmitter: EventEmitter<iCocktail> = new EventEmitter<iCocktail>();
  
  public recipeIsVisible: boolean = false;
  // public tags: string[] = [ "Sucré", "Épicé"];
  constructor() { }

  ngOnInit() {}

  public onLoadRecipe(): void {
    this.viewRecipeEmitter.emit(this.cocktail);
  }


}
