import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../shared/services/project.services';
import { ProjectInterface } from '../shared/model/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectformComponent } from './projectform/projectform.component';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements OnInit {
  public errorMessage: string = '';
  public proj: ProjectInterface[] = [];
  @ViewChild(MatTable) projectTable: MatTable<ProjectInterface>;
  public newproj: ProjectInterface = {
    id: 0,
    project_name: '',
    company: '',
  };
  public displayedColumns: string[] = [
    'id',
    'project_name',
    'company',
    'actions',
    'updateActions',
  ];

  constructor(
    private projectservice: ProjectService,
    private toastservice: ToastService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.projectservice.getProjects().subscribe((data) => {
      this.proj = data;
    });
  }

  private refreshData(): void {
    this.projectservice.getProjects().subscribe((data) => {
      this.proj = data;
    });
  }

  public openAddRecordForm(): void {
    const dialogRef = this.dialog.open(ProjectformComponent, {
      width: '360px',
    });
  }
  public deleteProject(id: number): void {
    const userConfirmed = confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
      this.projectservice.deleteProject(id).subscribe(() => {
        this.proj = this.proj.filter((item) => item.id !== id);
        this.toastservice.showToast(
          TOAST_STATE.success,
          'Record deleted Successfully'
        );
        this.refreshData();
      });
    } else {
      this.toastservice.showToast(
        TOAST_STATE.success,
        'Record deleted cancelled'
      );
    }
  }

  // addNewProject(): void {
  //   this.projectservice.addProject(this.newproj).subscribe(
  //     (response: ProjectInterface) => {
  //       this.showSuccessMessage = true
  //       this.successMessage = "error encountered!"
  //       setTimeout(() => {
  //         this.showSuccessMessage = false
  //       }, 3000);
  //       this.refreshData();
  //     },
  //     (error) => {
  //       this.showSuccessMessage = true
  //       this.successMessage = error.error.detail[0].msg
  //       setTimeout(() => {
  //         this.showSuccessMessage = false
  //       }, 3000);
  //     }
  //   );
  // }
  public updateExistingProject(id: number): void {
    const existingRecord = this.proj.find((item) => item.id === id);
    if (existingRecord) {
      const dialogRef = this.dialog.open(ProjectformComponent, {
        width: '360px',
        data: { editMode: true, record: existingRecord },
      });

      dialogRef.afterClosed().subscribe(
        (result: ProjectInterface | undefined) => {
          if (result) {
            const index = this.proj.findIndex((item) => item.id === result.id);
            this.projectTable.renderRows();
            if (index !== -1) {
              this.proj[index] = result;
              this.toastservice.showToast(
                TOAST_STATE.success,
                'Record updated Successfully'
              );
            }
          }
        },
        (error) => {
          if (error?.error?.detail?.length > 0) {
            const errorMessageObj = error.error.detail[0];
            const fieldName =
              errorMessageObj.loc[errorMessageObj.loc.length - 1]; // Get the last field name causing the error
            const errorMessage = `${fieldName} is not a valid field..!`;
            this.errorMessage = errorMessage;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    }
  }
}
