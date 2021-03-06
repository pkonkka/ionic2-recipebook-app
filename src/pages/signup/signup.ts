import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(
    private authService: AuthService, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {}

  // --------------------------------------------------------
  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing...'
    });
    loading.present();

    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        this.navCtrl.popToRoot();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign Up failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
