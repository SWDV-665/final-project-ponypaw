import { Injectable } from '@angular/core';
import { AlertController, Item } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = "mylist";
/*
  Generated class for the ReptiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReptiServiceProvider {

  constructor(private storage: Storage, public alertCtrl: AlertController, private camera: Camera) {
    
  }


  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      return base64Image;
     }, (err) => {
      console.log(err);
     });

  }

  getData() {
    console.log("Storage is ");
    console.log(this.storage.length());
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item) {

    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(index) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async updateItem(item) {
    return this.storage.get(STORAGE_KEY).then((items:Item[]) => {
      if(!items || items.length === 0) {
        return null;
      }

      let newItems: Item[] = [];

      for (let i of items) {
        if (i._name === item.name) {
          newItems.push(item)
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set(STORAGE_KEY, newItems);
    });
  }
  
}



