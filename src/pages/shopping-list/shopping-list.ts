import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, PopoverController } from 'ionic-angular';

import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  listItems: Ingredient[];

  // ----------------------------------------------------------------------------
  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }
  // ----------------------------------------------------------------------------
  ngOnInit() {
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
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
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
                this.slService.storeList(token)
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
  private loadItems() {
    this.listItems = this.slService.getItems();
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
