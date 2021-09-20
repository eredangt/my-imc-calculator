import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;
  situation: string;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    if (imc < 18.5) {
      this.situation = 'MAGREZA';
    }
    else if (imc <= 24.9) {
      this.situation = 'NORMAL';
    }
    else if (imc <= 29.9) {
      this.situation = 'SOBREPESO';
    }
    else if (imc <= 39.9) {
      this.situation = 'OBESIDADE';
    }
    else {
      this.situation = 'OBESIDADE GRAVE';
    }
    this.showMessage(`IMC = ${imc.toFixed(2)} &#8212 ${this.situation}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'tertiary',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
