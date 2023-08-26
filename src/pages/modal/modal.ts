import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ReptiServiceProvider } from '../../providers/repti-service/repti-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup } from '@angular/forms';

const STORAGE_KEY = "mylist";
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

  loadPet(index){
    this.storage.get(STORAGE_KEY).then((result) => {  
     result.forEach(element => {
       let i = JSON.stringify(element.name);
       i = i.replace(/['"]+/g, '');
       console.log(i);
       console.log(index);
         if (i == index) {
           this.myPet = element;
           console.log(this.myPet);
         } else {
           console.log("Nothing found");
           return;
         }
     });
     
   })
 }

  constructor(private storage: Storage, private camera: Camera, private navParams: NavParams, private view: ViewController, public dataService: ReptiServiceProvider) {
    
    // if index has been passed, get pet at index from storage and save info as myPet{}
    if(this.navParams.data) {
      this.index = this.navParams.data.data; // gives actual data passed
      this.loadPet(this.index);
      console.log(this.myPet);
    }
  }


  

  ionViewWillLoad() {
    this.index = this.navParams.get('data');

    this.storage.get('petsArray').then(
      ids => this.storage.keys = ids
    );
    
  }

  private formData: FormGroup;

  ngOnInit() {
    this.formData = new FormGroup({
      image: new FormControl(),
      name: new FormControl(),
      species: new FormControl(),
      morph: new FormControl(),
      hatchDate: new FormControl(),
      length: new FormControl(),
      weight: new FormControl(),
      lastWeight: new FormControl(),
      lastWeightDate: new FormControl(),
      condition: new FormControl(),
      uvbInstallDate: new FormControl(),
      uvbStrength: new FormControl(),
      warmTemp: new FormControl(),
      coolTemp: new FormControl(),
      humidity: new FormControl(),
      encloseSize: new FormControl(),
      lastMealDate: new FormControl(),
      lastMealType: new FormControl(),
      lastMealAdds: new FormControl(),
      lastShed: new FormControl(),
      lastPoo: new FormControl(),
      lastPooNotes: new FormControl(),
      meds: new FormControl(),
      procedures: new FormControl(),
      notes: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.formData.value);
    this.dataService.addData(this.formData.value);
  }

  closeModal(i?) {
    const data = this.formData;

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
