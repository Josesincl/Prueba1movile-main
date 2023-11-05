import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  regions: any[] = [];
  comunas: any[] = [];
  selectedRegionId: number = 0;

  region: string='';
  comuna: string='';

  Usuario: string= '';
 
  Correo: string = '';
  contrasena: string = '';
  
  selectedRegion: string = '';
  selectedComuna: string = '';

  constructor(private http: HttpClient, private navCtrl: NavController, private animationCtrl: AnimationController, private alertController: AlertController, private storage: Storage) {}

  async ngOnInit() {
    this.getRegions();
    this.storage.create();
  }

  getRegions() {
    this.http.get('https://dev.matiivilla.cl/duoc/location/region').subscribe(
      (response: any) => {
        this.regions = response.data; // Assign the 'data' property
        console.log(this.regions);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  onRegionChange(event: any) {
    this.selectedRegionId = event.detail.value;
    const selectedRegion = this.regions.find(region => region.id === this.selectedRegionId);
    this.selectedRegion = selectedRegion ? selectedRegion.nombre : '';
    console.log("la region es: "+this.selectedRegion)
    this.getComuna();
  }
  getComuna() {
    this.http.get('https://dev.matiivilla.cl/duoc/location/comuna/'+this.selectedRegionId).subscribe(
      (response: any) => {
        this.comunas = response.data; // Assign the 'data' property
        console.log(this.comunas);
        if (this.comunas.length > 0) {
          this.selectedComuna = this.comunas[0].nombre; // Asígnalo al primer elemento por defecto
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  limpiarcampos(){
    this.Usuario = '';
    this.Correo = '';
    this.contrasena  = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Las condiciones no se cumplen. Verifica los datos solicitados.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  registro(){
    
    const nombreInput = document.getElementById('Usuario') as HTMLInputElement;
    const Usuario = nombreInput.value;

    const contrasenaInput = document.getElementById('Correo') as HTMLInputElement;
    const contrasena = contrasenaInput.value;
    
    const apellidoInput = document.getElementById('contrasena') as HTMLInputElement;
    const Correo = apellidoInput.value;
    
    
    // const comunaInput = document.getElementById('comuna') as HTMLSelectElement;
    // this.selectedComuna = comunaInput.options[comunaInput.selectedIndex].text;
    // console.log(this.selectedComuna)

      if(Usuario.length>3 && Usuario.length<20){
        if(Correo.length>3 && Correo.length<50){
              if(contrasena.length>2 && contrasena.length<10){
  
                //guardar datos storage
  
                localStorage.setItem('correo',Correo);
                localStorage.setItem('contrasena',contrasena);
                localStorage.setItem('nombrealumno',Usuario);
                console.log("asasdasd");

                this.storage.set("apellido",Correo);
                this.storage.set("contrasena",contrasena);
                this.storage.set("nombrealumno",Usuario);
                this.storage.set("region", this.selectedRegion);
                this.storage.set("comuna", this.selectedComuna);
  
              }else{
                console.log("1");
                this.presentAlert();
              }
          }else{
            console.log("3");
            this.presentAlert();
          }
        }else{
          console.log("4");
          this.presentAlert();
        }

   
  }

}
