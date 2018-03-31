import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'; // added this bc we dont want hard coded info
import { HomePage } from '../home/home'; // ../folder/component; will allow us to navigate back to homepage

/** I did not add this comments below
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;      // 2-way data binding should be bound to 'city' property from settings.html
  state:string;     // 2-way data binding should be bound to 'state' property 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {  // added as a dependency
    
    this.storage.get('location').then((val) => { // similar to what we did on home.ts
      if (val != null) {
        let location = JSON.parse(val);
        this.city = location.city;
        this.state = location.state;
      } else {
        this.city = 'Wilmington'; // will be the default city & state
        this.state = 'DE';
      }
    });

      // this.city = 'Miami';
      // this.state = 'FL';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(){
    let location = { // created a varible & set it to an object
      city: this.city, // whatever we type in our city on settings will be bound to city in export class SettingsPage above
      state: this.state
    }
   // console.log(location); // to test out
    this.storage.set('location', JSON.stringify(location)); // wanna set location & be stored as a string & this is an object. 
            // JSON.stringify will turn it into a string. dont forget to pass 'location' into JSON.stringify...
    this.navCtrl.push(HomePage);  // wanna be able to navigate back to the home page, had to import at top of page
  }                                               

}
