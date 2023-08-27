import { Component } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { ReptiServiceProvider } from '../../providers/repti-service/repti-service';
import { NgZone } from '@angular/core';


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

  constructor(private zone: NgZone,public modalCtrl: ModalController,public navCtrl: NavController, public dataService: ReptiServiceProvider) { 
    this.loadData();
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }
  
  openModal(i?) {
    if(i) {
      const modal: Modal = this.modalCtrl.create('ModalPage', {data: i});
      modal.present();
      modal.onWillDismiss((data) => {
      // overwrite existing pet info at i and save
      this.dataService.updateItem(data);
    });
    } else {
      const modal: Modal = this.modalCtrl.create('ModalPage');
      modal.present();
      modal.onWillDismiss((data) => {
        // save new pet data
      this.dataService.addData(data);
      
    });
    }
    
    
  }

}


