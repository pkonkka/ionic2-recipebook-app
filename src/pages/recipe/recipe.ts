import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recipeService: RecipeService) {}


  // -------------------------------------------------------
  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');

    console.log('ngOnInit: ', this.recipe);
  }

  // -------------------------------------------------------
  onEditRecipe() {
    this.navCtrl.push(RecipeEditPage, { mode: 'Edit', recipe: this.recipe, index: this.index})
  }

  // -------------------------------------------------------
  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
