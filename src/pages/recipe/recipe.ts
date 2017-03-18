import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { RecipeService } from '../../services/recipe';
import { ShoppingListService } from '../../services/shopping-list';

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
    public recipeService: RecipeService,
    public slService: ShoppingListService) {}

  // -------------------------------------------------------
  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
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

  // -------------------------------------------------------
  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);
  }  

}
