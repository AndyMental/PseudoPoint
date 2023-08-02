import { Component, ViewChild } from '@angular/core';
import { CoursesService } from '../shared/services/courses.service';
import { CoursesModel } from '../shared/model/courses';
import { MatDialog } from '@angular/material/dialog';
import { PopupFormComponent } from './popupform/popupform.component';
import { ToastService, TOAST_STATE } from '../shared/services/toast.service';
import { DeleteconfirmationDialogComponent } from '../deleteconfirmation-dialog/deleteconfirmation-dialog.component';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  
})
export class CoursesComponent  {
  public displayedColumns: string[] = ['course_id', 'title', 'instructor', 'description', 'price', 'duration', 'prerequisites','actions'];
  public course:CoursesModel[] = [];
  @ViewChild(MatTable) coursesTable!:MatTable<any>;
  public newCourse:CoursesModel = {
    course_id:0,
    title:'',
    instructor:'',
    description:'',
    price:0,
    duration:0,
    prerequisites:''
  }

  constructor(
     private courseservice:CoursesService,
     private dialog:MatDialog,
     private toastservice:ToastService,){}
    ngOnInit() {
    this.courseservice.getCourses().subscribe((data)=>{
      this.course = data
    })
  }

    public openAddCourse():void {
    const dialogRef = this.dialog.open(PopupFormComponent, {
      width: '500px',
      data: { editMode: false, record:{ ...this.newCourse }, coursesTable: this.coursesTable }
    });
    dialogRef.afterClosed().subscribe((result: CoursesModel|undefined) => { 
      if (result) {
         
        this.coursesTable.renderRows();
      }
      
    });
    
    
  }
  public addNewCourse(newCourseData: CoursesModel): void {
    const newCourse: CoursesModel = {
      course_id: 0, 
      title: newCourseData.title,
      instructor: newCourseData.instructor,
      description: newCourseData.description,
      price: newCourseData.price,
      duration: newCourseData.duration,
      prerequisites: newCourseData.prerequisites,
    };
  
    this.courseservice.addCourse(newCourse).subscribe(
      (response: CoursesModel) => {
        
        this.course.push(response);
        this.coursesTable.renderRows();
        this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      },
      (error) => {
        
        this.toastservice.showToast(TOAST_STATE.danger, `Error adding new Course: ${error}`);
      }
    );
  }
  
  public updateExistingCourse(course_id: number):void {

      var existingCourse = this.course.find((item) => item.course_id === course_id);
      
      if (existingCourse) {
        const dialogRef = this.dialog.open(PopupFormComponent, {
          width: '400px',
          data: { editMode: true, record: existingCourse }
        });
  
        dialogRef.afterClosed().subscribe((result: CoursesModel | undefined) => {
          if (result) {
            const index = this.course.findIndex((item) => item.course_id === result.course_id);
            if (index !== -1) {
              this.course[index] = result;
              this.coursesTable.renderRows();
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
            }
            
          } 
          if (result) {
            this.updateCourse(result);
          }
          
        });
        
      } 
    
  }
  public updateCourse(updatedCourse: CoursesModel): void {
    this.courseservice.updateCourse(updatedCourse).subscribe(
      (response: CoursesModel) => {
        this.coursesTable.renderRows();
       
      },
      
    );
  }
  
  public deleteCourse(course_id: number):void {
    const dialogRef = this.dialog.open(DeleteconfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this course?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.courseservice.deleteCourse(course_id).subscribe(
          () => {
            this.course = this.course.filter((item) => item.course_id !== course_id);
            this.coursesTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
          },
          (error) => {
            
            this.toastservice.showToast(TOAST_STATE.danger,`Error occurred while deleting Item: ${error}`
            );
          }
        );
      }
    });
  }
}