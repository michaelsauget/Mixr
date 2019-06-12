import { Component, AfterViewInit } from '@angular/core';
import { iCocktail, iTasteTag, iTasteTagQuery } from '../../../../common/interfaces';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../../common/constants';

@Component({
  selector:     'app-tab3',
  templateUrl:  'tab3.page.html',
  styleUrls:   ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  public tasteTags: iTasteTag[];
  public selectedTags: string;
  public cocktail: iCocktail = {
    cocktailno:     "",
    name:           "",
    price:          "", // a changer?
    photourl:       "",
    preparation:    "",
    decoration:     "",
  };
  
  constructor(private httpClient: HttpClient) {}
  
  ngAfterViewInit(): void {
    this.getAllTags();
  }

  public getAllTags(): void {
    this.httpClient.get<iTasteTagQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_COCKTAIL + "/tastetags")
    .subscribe((query: iTasteTagQuery) => {
      this.tasteTags = query.tags;
      console.log(this.tasteTags);
      
    });
  }


  logForm() {
    console.log(this.cocktail)
    console.log(this.tasteTags);
    
  }


}
