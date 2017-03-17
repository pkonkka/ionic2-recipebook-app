import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { RecipePage } from '../recipe/recipe';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage {
  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController, private recipeService: RecipeService) {

  }

  // -------------------------------------------------------------
  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  // -------------------------------------------------------------
  onNewRecipe() {
    this.navCtrl.push(RecipeEditPage, {mode: 'New'});
  }

  // -------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(RecipePage, { recipe: this.recipes[index], index: index});
  }



}
