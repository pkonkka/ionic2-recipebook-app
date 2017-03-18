import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../models/ingredient';

import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  listItems: Ingredient[];

  // ----------------------------------------------------------------------------
  constructor(private slService: ShoppingListService) {

  }

  ngOnInit() {
    this.loadItems();
    console.log('ngOnInit: ', this.listItems);
    
  }

  // ----------------------------------------------------------------------------
  ionWillEnter() {
    // this.loadItems();
    // console.log('ionWillEnter: ', this.listItems);
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
    console.log('loadItems: ', this.listItems);
  }

}
