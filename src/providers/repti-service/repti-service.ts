import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
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

  pets = [
    {
      name: "Ally Gator",
      hatchDate: "May 1, 2010",

    },
    {
      name: "Later Gator",
      hatchDate: "October 2, 2020",

    },
    {
      name: "Calli Cresto",
      hatchDate: "January 17, 2009",

    }
  ];

  constructor(private storage: Storage, public alertCtrl: AlertController, private camera: Camera) {
    console.log('');
  }

  editPrompt(pet?, i?) {
    const prompt = this.alertCtrl.create({    
      
      title: pet ? "Edit Pet" : "Add Pet",
      message: "Please enter their info.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: pet ? pet.name : null
        },
        {
          name: 'species',
          placeholder: 'Enter species',
          value: pet ? pet.species : null
        },
        {
          name: 'morph',
          placeholder: 'Enter morph',
          value: pet ? pet.morph : null
        },
        {
          name: 'hatchDate',
          placeholder: 'Enter hatch date',
          value: pet ? pet.hatchDate : null
        },
        // {
        //   name: 'length',
        //   placeholder: 'Enter length',
        //   value: pet ? pet.length : null
        // },
        // {
        //   name: 'weight',
        //   placeholder: 'Enter weight',
        //   value: pet ? pet.weight : null
        // },
        // {
        //   name: 'lastWeight',
        //   placeholder: 'Enter last weight',
        //   value: pet ? pet.lastWeight : null
        // },
        // {
        //   name: 'lastWeightDate',
        //   placeholder: 'Enter last weight date',
        //   value: pet ? pet.lastWeightDate : null
        // },
        // {
        //   name: 'condition',
        //   placeholder: 'Enter condition',
        //   value: pet ? pet.condition : null
        // },
        // {
        //   name: 'uvbInstallDate',
        //   placeholder: 'Enter date of UVB install',
        //   value: pet ? pet.uvbInstallDate : null
        // },
        // {
        //   name: 'uvbStrength',
        //   placeholder: 'Enter UVB strength',
        //   value: pet ? pet.uvbStrength : null
        // },
        // {
        //   name: 'warmTemp',
        //   placeholder: 'Enter warm side temperature',
        //   value: pet ? pet.warmTemp : null
        // },
        // {
        //   name: 'coolTemp',
        //   placeholder: 'Enter cool side temperature',
        //   value: pet ? pet.coolTemp : null
        // },
        // {
        //   name: 'humidity',
        //   placeholder: 'Enter haumidity',
        //   value: pet ? pet.humidity : null
        // },
        // {
        //   name: 'encloseSize',
        //   placeholder: 'Enter enclosure size',
        //   value: pet ? pet.encloseSize : null
        // },
        // {
        //   name: 'lastMealDate',
        //   placeholder: 'Enter date of last meal',
        //   value: pet ? pet.lastMealDate : null
        // },
        // {
        //   name: 'lastMealType',
        //   placeholder: 'Enter type of last meal',
        //   value: pet ? pet.lastMealType : null
        // },
        // {
        //   name: 'lastMealAdds',
        //   placeholder: 'Enter additives used on last meal',
        //   value: pet ? pet.lastMealAdds : null
        // },
        // {
        //   name: 'lastShed',
        //   placeholder: 'Enter date of last meal',
        //   value: pet ? pet.lastShed : null
        // },
        // {
        //   name: 'lastPoo',
        //   placeholder: 'Enter date of last excretory action',
        //   value: pet ? pet.lastPoo : null
        // },
        // {
        //   name: 'lastPooNotes',
        //   placeholder: 'Enter notes on last extretory action',
        //   value: pet ? pet.lastPooNotes : null
        // },
        // {
        //   name: 'meds',
        //   placeholder: 'Enter medications given',
        //   value: pet ? pet.meds : null
        // },
        // {
        //   name: 'procedures',
        //   placeholder: 'Enter any procedures carried out',
        //   value: pet ? pet.procedures : null
        // },
        // {
        //   name: 'notes',
        //   placeholder: 'Enter notes',
        //   value: pet ? pet.notes : null
        // },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            if (!pet) {
              this.addData(data);
            } else {
              this.pets[i] = data;
            }
          }
        },
        {
          text: 'Delete',
          handler: data => {
            console.log('delete clicked');
            this.pets.splice(i, 1);
          }
        },
      ]
    });
    prompt.present();
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
      // Handle error
     });

  }

  getData() {
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
}



