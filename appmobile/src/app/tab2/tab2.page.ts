import { Component, OnInit } from '@angular/core';
// import { IonList } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { iCocktail, iCocktailQuery } from '../../../../common/interfaces';
import { Constants } from "../../../../common/constants";

import { ViewChild} from '@angular/core';
import { IonSearchbar, IonContent } from '@ionic/angular';
import { CocktailPresentationPage } from "../cocktail-presentation/cocktail-presentation.page";
import { ModalController } from '@ionic/angular';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  
  
  public cocktails: iCocktail[] = [];
  public searchText: string = "";
  public searchViewIsActive:  boolean = false;
  public isInRecipeView:      boolean = false;

  public cocktailToDisplay: iCocktail;

  @ViewChild("searchBar") searchBar: IonSearchbar;
  @ViewChild(IonContent) content: IonContent;  
  
  public constructor(
	private httpClient: HttpClient, 
	public modalController: ModalController, 
	private navController: NavController
  ) {}
  
  public async ngOnInit(): Promise<void> {
    await this.fetchAllCocktails();
  }

  public async openCocktailPage(cocktailToDisplay: iCocktail): Promise<void> {
  // 
    this.cocktailToDisplay = cocktailToDisplay;

    const modal = await this.modalController.create({
      component: CocktailPresentationPage,
      componentProps: {
        cocktail: this.cocktailToDisplay,
      }
    });
    return await modal.present();
  }

  public onSearchBarInput(): void {
    if (this.searchText !== "") {
      this.httpClient.get<iCocktailQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_COCKTAIL + "searchByName/" + this.searchText)
      .subscribe((query: iCocktailQuery) => {
        this.cocktails = query.cocktail;
        this.adjustPhotoUrl();
      });
    } else {
      this.fetchAllCocktails();
    }
  }

  public onResumeCocktailList(): void {
    this.isInRecipeView = false;
  }

  public toggleSearchBar(): void {
    this.content.scrollToTop(1000);
    this.searchBar.setFocus(); 
  }

  private async fetchAllCocktails(): Promise<void> {
    this.httpClient.get<iCocktailQuery>(Constants.SERVER_URL + ":" + Constants.SERVER_PORT + Constants.API_COCKTAIL)
    .subscribe((query: iCocktailQuery) => {
      this.cocktails = query.cocktail;
      this.cocktails.sort((c1: iCocktail, c2: iCocktail) => {
        return Number(c2.cocktailno) - Number(c1.cocktailno);
      });
      this.adjustPhotoUrl();
    });
  }

  // a mettre dans un pipe quand jvais reussir a comprendre comment
  private adjustPhotoUrl(): void {
    const imagesUrl: string = Constants.SERVER_URL + ":" + Constants.SERVER_PORT + "/images/";
    this.cocktails.forEach((cocktail: iCocktail) => {
      cocktail.photourl = imagesUrl + cocktail.photourl;
    });
  }

}
