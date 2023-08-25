import { Component } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { ReptiServiceProvider } from '../../providers/repti-service/repti-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Reptihealth";
  listData = [];

  async loadData() {
    this.listData = await this.dataService.getData();
  }

  async addData(pet) {
    await this.dataService.addData(pet);
    this.loadData();
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

  createPetRecord() {
    this.openModal();
  }

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public dataService: ReptiServiceProvider) { 
    this.loadData();
  }
  
  openModal(i?) {
    if(i) {
      const modal: Modal = this.modalCtrl.create('ModalPage', {data: i});
      modal.present();
      modal.onWillDismiss((data) => {
      console.log("modal data is" + data);
      // overwrite existing pet info at i and save
    });
    } else {
      const modal: Modal = this.modalCtrl.create('ModalPage');
      modal.present();
      modal.onWillDismiss((data) => {
      console.log("modal data is");
      console.log(data);
      this.dataService.addData(data);
      // save new pet data
    });
    }
    
    
  }

}


