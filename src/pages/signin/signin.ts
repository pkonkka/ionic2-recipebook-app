import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {}

  // -------------------------------------------------------------
  onSignin(form: NgForm) {

    const loading = this.loadingCtrl.create({
      content: 'Sign in...'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign In failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
    
  }

}
