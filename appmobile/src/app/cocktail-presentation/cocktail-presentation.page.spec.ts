import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailPresentationPage } from './cocktail-presentation.page';

describe('CocktailPresentationPage', () => {
  let component: CocktailPresentationPage;
  let fixture: ComponentFixture<CocktailPresentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocktailPresentationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailPresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
