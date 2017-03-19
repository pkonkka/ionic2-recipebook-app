import { Component } from '@angular/core';
import { 
  AlertController, 
  LoadingController, 
  NavController,
  PopoverController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { RecipeEditPage } from '../recipe-edit/recipe-edit';
import { RecipeService } from '../../services/recipe';



@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage {
  recipes: Recipe[] = [];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController, 
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private recipeService: RecipeService) {

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

  // ----------------------------------------------------------------------------
  onShowOptions(event: MouseEvent) {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);

    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data != null && data.action == 'load') {
          loading.present();
          this.authService.geCurrentUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.fetchRecipes(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().message);
                    }
                  )
              }
            );
          
        } else if (data != null && data.action == 'store') {
          loading.present();
          this.authService.geCurrentUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.storeRecipes(token)
                  .subscribe(
                    () => {
                      loading.dismiss();
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().message);
                    }
                  )
              }
            );
        } 
      }
    )
  }


  // ----------------------------------------------------------------------------
  private handleError(errorMessage: string) {

    const alert = this.alertCtrl.create({
      title: 'Error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }



}
