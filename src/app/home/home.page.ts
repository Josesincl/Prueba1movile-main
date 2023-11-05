import { Component } from '@angular/core';
import  { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  latitud:number|undefined;
  longitud:number|undefined;
  constructor(){}

  async obtennerCordenadas(){
    const obtennerCordenadas = await Geolocation.getCurrentPosition()
    this.latitud=obtennerCordenadas.coords.latitude;
    this.longitud=obtennerCordenadas.coords.longitude;
  }


}
