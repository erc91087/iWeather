import { Injectable } from '@angular/core'; // inject as a dependency
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// service & provider
@Injectable()
export class WeatherProvider {  // imported in home.ts
  apiKey = '2430af1e1739e9b3';  // added
  url;  // added

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
  }
// http://api.wunderground.com/api/2430af1e1739e9b3/conditions/q/CA/San_Francisco.json
// concat '+this.apiKey+' for 2430af1e1739e9b3
// removed /CA/San_Francisco.json bc we dont always want SF weather

getWeather(city, state) {         // added this method to take in any city
  return this.http.get(this.url+'/'+state+'/'+city+'.json')
  .map(res => res.json());
  // will return an observable
}

}
