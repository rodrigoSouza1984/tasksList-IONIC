import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  template: 
    `<ion-buttons>
    <ion-menu-toggle [menu]="menu">
      <ion-button>
        <ion-icon 
          slot="icon-only" 
          name="menu-outline">
        </ion-icon>
      </ion-button>
    </ion-menu-toggle>
  </ion-buttons>` 

})
export class MenuToggleComponent {

  @Input() menu: string;

}
