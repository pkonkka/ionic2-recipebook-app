import { Component } from '@angular/core';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesListPage } from '../recipes-list/recipes-list';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  slPage = ShoppingListPage;
  recipesPage = RecipesListPage;

}
