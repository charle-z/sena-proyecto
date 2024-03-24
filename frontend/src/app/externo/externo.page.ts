import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-externo',
  templateUrl: './externo.page.html',
  styleUrls: ['./externo.page.scss'],
})


export class ExternoPage implements OnInit {
  presentingElement = undefined;

  isModalOpen = false;
  searchTerm: string;
  results: any[];

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private actionSheetCtrl: ActionSheetController,
    private http: HttpClient) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
  search() {
    this.http.get(`https://sios19.000webhostapp.com/movil/consultaorden?id_orden=${this.searchTerm}`)
      .subscribe((results: any[]) => {
        this.results = results;
      });
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
}