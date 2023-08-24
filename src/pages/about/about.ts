import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReptiServiceProvider } from '../../providers/repti-service/repti-service';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public dataService: ReptiServiceProvider) {

  }

}
