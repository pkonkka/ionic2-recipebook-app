import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../services/auth';

import 'rxjs/Rx';

import { Ingredient } from '../models/ingredient';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http: Http, private authService: AuthService) {}

    // -------------------------------------------------------
    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
    }

    // -------------------------------------------------------
    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    // -------------------------------------------------------
    getItems() {
        return this.ingredients.slice();   // return copy of ingredients
    }

    // -------------------------------------------------------
    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    // -------------------------------------------------------
    storeList(token: string) {
        const userId = this.authService.geCurrentUser().uid;

        return this.http.put(
            'https://ionic2-recipe-book-943b1.firebaseio.com/' + userId + 
            '/shopping-list.json?auth=' + token,
            this.ingredients)
            .map((response: Response) => {
               return response.json(); 
            });
    }

    // -------------------------------------------------------
    fetchList(token: string) {
        const userId = this.authService.geCurrentUser().uid;

        return this.http.get(
            'https://ionic2-recipe-book-943b1.firebaseio.com/' + userId + 
            '/shopping-list.json?auth=' + token,
            this.ingredients)
            .map((response: Response) => {
               return response.json(); 
            })
            .do((data) => {
                this.ingredients = data
            });
    }

}