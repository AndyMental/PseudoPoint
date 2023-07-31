import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-error-tost',
  templateUrl: './error-tost.component.html',
  styleUrls: ['./error-tost.component.css']
})
export class ErrorTostComponent {

  @Input() errorMessage: string

}
