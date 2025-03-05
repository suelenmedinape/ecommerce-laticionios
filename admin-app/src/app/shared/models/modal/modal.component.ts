import { Component } from '@angular/core';

@Component({
  selector: 'dialog[app-modal]',
  standalone: true,
  template: `
    <ng-content/>
  `,
  styleUrl: 'modal.component.scss'
})
export class ModalComponent {

}
