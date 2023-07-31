import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  openSidebar() {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }
  collapseSideBar() {
    document.querySelector(".sidebar").classList.remove("hidden");
  }

}
