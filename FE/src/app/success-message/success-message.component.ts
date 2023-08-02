import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})

export class SuccessMessageComponent {
  @Input() message:string = '';
  public showSuccessMessage:boolean = true;
  hideSuccessMessage(): void {
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

}
