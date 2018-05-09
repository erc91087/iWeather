import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather'; // added
// WeatherProvider from weather.ts. / = folders
import { Storage } from '@ionic/storage'; // added this from app.module.ts

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;          // added this
  location: {
    city:string,
    state:string
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,    // dependency injection
    private storage:Storage) {                  // dependency injection

  }

ionViewWillEnter() {
  // use get when we wanna 'get' the information. ex: value of location
  // this is asynchronous so it returns a promise. ex: .then((val) =>
  // whatever gets stored in location will be in val
this.storage.get('location').then((val) =>{  
  if (val != null) {
    this.location = JSON.parse(val); // when we saved location its as an object, when you save something in storage it must be a string
  } else {                          // we want to parse it as JSON so w can access it as an object
    this.location = { // relocated this info here from below (asyncronous) default value
      city: 'Wilmington',   // the weather displayed on the home page
      state: 'DE'
    }
  }
  this.weatherProvider.getWeather(this.location.city, this.location.state)
    .subscribe(weather =>{
      this.weather = weather.current_observation; // relocated to here so it is stored in 'then'
    });
}); 


/*
this.location = {   // we dont wanna hard code this, wanna store it, added imports up top and in app.module.ts
  city: 'Miami',
  state: 'FL'
}
*/

/* BC this is asyncronous, it wont work down here. must be in the 'then' when we 'get' the weather info
this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(weather =>{
this.weather = weather.current_observation;
});
*/

// will return an observable
// observables are data streams, so we need to subscribe to that stream to that observable
}
// there are life cycle methods that we can hook into. recomended
}
