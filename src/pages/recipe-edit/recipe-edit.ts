import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { 
  ActionSheetController, 
  AlertController, 
  NavController,
  NavParams,
  ToastController } from 'ionic-angular';

import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-recipe-edit',
  templateUrl: 'recipe-edit.html'
})
export class RecipeEditPage implements OnInit {
  mode = 'New';
  recipe: Recipe;
  recipeIndex = 0;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  // ---------------------------------------------------------------------
  constructor(
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private tostCtrl: ToastController,
    private recipeService: RecipeService,
    private navCtrl: NavController) {

  }

  // ---------------------------------------------------------------------
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.recipe = this.navParams.get('recipe');
    this.recipeIndex = this.navParams.get('index');
    this.initForm(this.mode, this.recipe);

  }

  // ---------------------------------------------------------------------
  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1}
      });
    }
    if (this.mode == 'New') {
      this.recipeService.addRecipe(
        value.title,
        value.description,
        value.difficulty,
        ingredients
      );
    } else {
      this.recipeService.updateRecipe(
        this.recipeIndex, 
        value.title,
        value.description,
        value.difficulty,
        ingredients);      
    }
    this.navCtrl.popToRoot();
  }

  // ---------------------------------------------------------------------
  onRemove() {
    this.recipeService.removeRecipe(this.recipeIndex);
    this.navCtrl.popToRoot();
  }


  // ---------------------------------------------------------------------
  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;

            if (len > 0) {
              for (let i = len-1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.tostCtrl.create({
                message: 'All ingredients were deleted!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
    });
    actionSheet.present();
  }

  // ---------------------------------------------------------------------
  private createNewIngredientAlert() {

    return this.alertCtrl.create({
      title: 'Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.tostCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
              const toast = this.tostCtrl.create({
                message: 'Item added!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              
          }
        }
      ]
    });
  }

  // ---------------------------------------------------------------------
  private initForm(mode: string, recipe: Recipe) {

    if (mode == 'New') {
      this.recipeForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'difficulty': new FormControl(this.selectOptions[1], Validators.required),
        'ingredients': new FormArray([])
      });
    } else {

      let recipeIngredients = [];

      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(new FormControl(ingredient.name, Validators.required));
      }


      this.recipeForm = new FormGroup({
        'title': new FormControl(recipe.title, Validators.required),
        'description': new FormControl(recipe.description, Validators.required),
        'difficulty': new FormControl(recipe.difficulty, Validators.required),
        'ingredients': new FormArray(recipeIngredients)
      });      
    }

    console.log('recipeForm: ', this.recipeForm)
  }


}
