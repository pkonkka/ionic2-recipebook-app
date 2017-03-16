import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../models/ingredient';

import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: Ingredient[];

  // ----------------------------------------------------------------------------
  constructor(private slService: ShoppingListService) {

  }

  // ----------------------------------------------------------------------------
  ionWillEnter() {
    this.loadItems();
  }

  // ----------------------------------------------------------------------------
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  // ----------------------------------------------------------------------------
  onRemoveItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  // ----------------------------------------------------------------------------
  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
