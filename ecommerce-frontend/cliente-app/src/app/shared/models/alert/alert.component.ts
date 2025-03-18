import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  imports: []
})
export class AlertComponent implements OnChanges {
  @Input() message: string = 'Ocorreu um erro!';
  @Input() showAlert: boolean = false;
  @Input() categAlert: number = 0;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showAlert'] && this.showAlert) {
      setTimeout(() => {
        this.showAlert = false;
        this.close.emit();
      }, 3000);
    }
  }

  closeAlert() {
    this.showAlert = false;
    this.close.emit();
  }
}
