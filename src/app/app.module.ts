import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesListPage } from '../pages/recipes-list/recipes-list';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipeEditPage } from '../pages/recipe-edit/recipe-edit';

import { ShoppingListService } from '../services/shopping-list';

import { CapitalizePipe } from '../pipes/capitalize';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesListPage,
    RecipePage,
    RecipeEditPage,
    CapitalizePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesListPage,
    RecipePage,
    RecipeEditPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService]
})
export class AppModule {}
