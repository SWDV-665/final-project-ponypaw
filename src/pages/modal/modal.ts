import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ReptiServiceProvider } from '../../providers/repti-service/repti-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  index = 0;
  myPet = {};
  base64Image:string;

  constructor(private storage: Storage, private camera: Camera, private navParams: NavParams, private view: ViewController, public dataService: ReptiServiceProvider) {
  }

  ionViewWillLoad() {
    this.index = this.navParams.get('data');

    this.storage.get('petsArray').then(
      ids => this.storage.keys = ids
    );

    console.log(this.myPet);
    
  }


  closeModal() {
    const data = this.myPet

    // save edited data to myPet

    // return the new myPet info
    this.view.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  saveImage(image) {
    let images;
    if (this.storage.get('imagesArray')) {
      this.storage.get('imagesArray').then((val) => {
        images = val;
      });
      this.storage.set('imagesArray', images);
      console.log("Images saved.");
    } else {
      console.log("No images to load.");
      return;
    }
  }

}
