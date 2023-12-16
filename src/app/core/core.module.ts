import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),//1 parametro sao as configuracoes copiadas no site, 2 parametro
    //é um nome que podemos dar para aplicacao, passamos so um parametro aki o nome nao passamos
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule.enablePersistence({
      experimentalForceOwningTab: true
    })
    
  ],
  exports:[
    BrowserModule,
    IonicModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

})
export class CoreModule { }
