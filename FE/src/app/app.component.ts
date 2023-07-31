import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCoursesTable: boolean = false;
  title = 'project1';
   openSidebar() {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }
  collapseSideBar() {
    document.querySelector(".sidebar").classList.remove("hidden");
  }
  // toggleCoursesTable(): void {
  //   this.showCoursesTable = !this.showCoursesTable;
  // }
  
}



