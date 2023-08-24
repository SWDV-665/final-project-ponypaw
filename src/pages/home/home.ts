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
    console.log("Load data run.");
  }

  async addData(pet) {
    await this.dataService.addData(pet);
    this.loadData();
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

  addPet() {
    this.dataService.editPrompt();
  }


  // savePets() {
  //   let petsArray = this.loadPets();
  //   this.dataService.savePets(petsArray);
  // }

  // reloadPets() {
  //   this.dataService.getPets();
  //   return this.dataService.pets;
  // }



  // editPet(i) {
  //   this.dataService.editPet(i);
  // }

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public dataService: ReptiServiceProvider) { 
    this.loadData();
  }
  
  openModal(i) {
    const modal: Modal = this.modalCtrl.create('ModalPage', {data: i});
    modal.present();
    modal.onWillDismiss((data) => {
      console.log(data);
    });
  }

}


