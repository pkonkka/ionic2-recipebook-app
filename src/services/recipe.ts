import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { AuthService } from './auth';


@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(private authService: AuthService, private http: Http) {}

    // ------------------------------------------------------------------------------------------------
    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }

    // ------------------------------------------------------------------------------------------------
    getRecipes() {
        return this.recipes.slice();  // return copy of the array
    }

    // ------------------------------------------------------------------------------------------------
    updateRecipe(
        index: number, 
        title: string, 
        description: string, 
        difficulty: string, 
        ingredients: Ingredient[]) {

        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);

    }

    // ------------------------------------------------------------------------------------------------
    removeRecipe(index: number) {
        this.recipes.splice(index, 1)
    }

    // -------------------------------------------------------
    storeRecipes(token: string) {
        const userId = this.authService.geCurrentUser().uid;

        return this.http.put(
            'https://ionic2-recipe-book-943b1.firebaseio.com/' + userId + 
            '/recipe-list.json?auth=' + token,
            this.recipes)
            .map((response: Response) => {
               return response.json(); 
            });
    }

    // -------------------------------------------------------
    fetchRecipes(token: string) {
        const userId = this.authService.geCurrentUser().uid;

        return this.http.get(
            'https://ionic2-recipe-book-943b1.firebaseio.com/' + userId + 
            '/shopping-list.json?auth=' + token,
            this.recipes)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : [];
                for (let item of recipes) {
                    if (!item.hasOwnProperty('ingredients')) {
                        item.ingredients = [];
                    }
                }
                return recipes; 
            })
            .do((data) => {
                this.recipes = data
            });
    }    

}

