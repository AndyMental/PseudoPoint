import { Component, OnInit} from '@angular/core';
import { ProjectService } from '../shared/services/project.services';
import { ProjectInterface } from '../shared/model/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectformComponent } from './projectform/projectform.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  showSuccessMessage:boolean = false
  errorMessage:string = ''  
  successMessage:string=''
  proj:ProjectInterface[] = []
  newproj:ProjectInterface = {
    id:0,
    project_name:'',
    company:''
  }
  displayedColumns: string[] = ['id', 'project_name', 'company', 'actions', 'updateActions'];

  constructor(private projectservice:ProjectService, private dialog:MatDialog){}
  ngOnInit() {
    this.projectservice.getProjects().subscribe((data)=>{
      this.proj = data
    })
  }

  refreshData() { 
    this.projectservice.getProjects().subscribe((data) => {
      this.proj = data;
    });
  }

  openAddRecordForm() {
    const dialogRef = this.dialog.open(ProjectformComponent, {
      width: '360px',
    });
  }
  deleteProject(id: number) {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.projectservice.deleteProject(id).subscribe(() => {
        this.proj = this.proj.filter((item) => item.id !== id);
        this.showSuccessMessage = true
        this.successMessage = "Deleted successfully!"
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000);
        this.refreshData();
      });
    } else {
      this.showSuccessMessage = true
      this.successMessage = "Delete cancelled"
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 3000);
    }
  }

  addNewProject(): void {
    this.projectservice.addProject(this.newproj).subscribe(
      (response: ProjectInterface) => {
        console.log('New project added:', response);
        this.showSuccessMessage = true
        this.successMessage = "error encountered!"
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000);
        this.refreshData(); 

      },
      (error) => {
        this.showSuccessMessage = true
        this.successMessage = error.error.detail[0].msg
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000);
      }
    );
  }
  updateExistingProject(id: number) {
      const existingRecord = this.proj.find((item) => item.id === id);
      if (existingRecord) {
        const dialogRef = this.dialog.open(ProjectformComponent, {
          width: '360px',
          data: { editMode: true, record: existingRecord }
        });
  
        dialogRef.afterClosed().subscribe((result: ProjectInterface | undefined) => {
          if (result) {
            const index = this.proj.findIndex((item) => item.id === result.id);
            if (index !== -1) {
              this.proj[index] = result;
              this.showSuccessMessage = true
              this.successMessage = " Project updated successfully!"
              setTimeout(() => {
                this.showSuccessMessage = false
              }, 3000);
            }
          }
        }, (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName = errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
            const errorMessage = `${fieldName} is not a valid field..!`;
            this.errorMessage = errorMessage;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        });
      } else {
        this.showSuccessMessage = true
        this.successMessage = "error encountered!"
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000);
      } 
  } 
}



