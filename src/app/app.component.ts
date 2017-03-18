import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuCtrl: MenuController) {

    firebase.initializeApp({
      apiKey: "AIzaSyB4WAjtzxe3a82MhhCKZ8u7m8K1u6dbZkE",
      authDomain: "ionic2-recipe-book-943b1.firebaseapp.com",      
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  // --------------------------------------------------------------------
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  // --------------------------------------------------------------------
  onLogout() {

  }

}
