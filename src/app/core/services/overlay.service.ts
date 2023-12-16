import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, IonItemOptions, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

    async alert(options?: AlertOptions): Promise<HTMLIonAlertElement>{
      const alert = await this.alertCtrl.create(options);
      //await alert.dismiss//tira o alert da tela
      await alert.present();//mostra o alert na tela
      return alert;
    }

    async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement>{
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
        ...options
      });
      await loading.present();
      return loading;
    }

    async toast(options?: ToastOptions): Promise<HTMLIonToastElement>{
      const toast = await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        keyboardClose: true,
        message: 'Ok',        
        ...options
      });
      await toast.present();
      return toast;
    }

}
