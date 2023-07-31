import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public openSidebar(): void {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }
  public collapseSideBar() : void {
    document.querySelector(".sidebar").classList.remove("hidden");
  }
}
