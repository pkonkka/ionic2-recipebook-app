import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesListPage } from '../pages/recipes-list/recipes-list';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipeEditPage } from '../pages/recipe-edit/recipe-edit';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { DatabaseOptionsPage } from '../pages/database-options/database-options';

import { ShoppingListService } from '../services/shopping-list';
import { RecipeService } from '../services/recipe';
import { AuthService } from '../services/auth';

import { CapitalizePipe } from '../pipes/capitalize';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesListPage,
    RecipePage,
    RecipeEditPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage,
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
    RecipeEditPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService]
})
export class AppModule {}
