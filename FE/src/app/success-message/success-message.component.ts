import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent {

  @Input() message = '';
  showSuccessMessage = true;

  // Hide the success message after 3 seconds
  hideSuccessMessage(): void {
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

}
