import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RecipeEditPage } from '../recipe-edit/recipe-edit';


@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage {


  constructor(private navCtrl: NavController) {

  }

  // -------------------------------------------------------------
  onNewRecipe() {
    this.navCtrl.push(RecipeEditPage, {mode: 'New'});
  }


}
