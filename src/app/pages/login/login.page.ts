import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuariostorage: string = "";
  passstorage: string = ""; 
  login1: number = 0;

  login2: number = 0;

  constructor(private navCtrl: NavController,private alertController: AlertController, private storage: Storage) { }

  async ngOnInit() {
    this.storage.create();
    try {
      this.usuariostorage = await this.storage.get('Usurio');
      this.passstorage = await this.storage.get('contrasena');
    } catch (error) {
      console.error('Error al obtener datos del almacenamiento:', error);
    }
    }
    ionViewWillEnter() {
      this.datos();
    }

  async ngOnDestroy(){
    this.login2 = await this.storage.get('login');
    }  
    
  async datos(){
    this.usuariostorage = await this.storage.get('Usuario');
    this.passstorage = await this.storage.get('contrasena');
  } 


  login(){

    const usuarioInput = document.getElementById('Usuario') as HTMLInputElement;
    const usuario = usuarioInput.value.trim();

    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    const contrasena = contrasenaInput.value.trim();

    //const rutlocal = localStorage.getItem('rut');
    //const contlocal = localStorage.getItem('contrasena');
    console.log("------------")
    console.log(usuario)
    console.log(contrasena)
    console.log(this.usuariostorage)
    console.log(this.passstorage)
  

    if(usuario != "" && contrasena !=""){
      if( usuario === this.usuariostorage && contrasena===this.passstorage){
        this.login1=1;
        this.storage.set("login",this.login1);
        this.datos()
      }else{
        this.presentAlert();
      }
  
    }else{
      this.presentAlert();
    }
   
  }
  presentAlert() {
    throw new Error('Method not implemented.');
  }
}
