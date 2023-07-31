import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.css']
})
export class AlertToastComponent implements OnInit {

  constructor(public toast: ToastService) { }

  ngOnInit(): void {
  }
}
