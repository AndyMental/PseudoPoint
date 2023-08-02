import { Component, OnInit,ViewChild } from '@angular/core';
import { EventData } from '../shared/model/events';
import { EventsService } from '../shared/services/events.service';
import { MatDialog } from '@angular/material/dialog';
import { EventformComponent } from './eventform/eventform.component';
import { ToastService,TOAST_STATE } from '../shared/services/Toast.service';
import { DeleteconfirmationDialogComponent } from '../deleteconfirmation-dialog/deleteconfirmation-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})

export class EventsComponent implements OnInit {
  public displayedColumns: string[] = ['event_id', 'names', 'date','location', 'description','actions'];
  public event:EventData[] = [];
  @ViewChild(MatTable) eventsTable!:MatTable<any>;
  
  public newEvent:EventData = {
    event_id:0,
    names:'',
    date:'',
    location:'',
    description:''
  }

  constructor(private eventservice:EventsService, private dialog:MatDialog,private toastservice:ToastService){}
  ngOnInit() {
    this.eventservice.getAllEvents().subscribe((data)=>{
      this.event = data
    })
  }


  public openAddEvent():void {
    const dialogRef = this.dialog.open(EventformComponent, {
      width: '400px',
      data: { editMode: false, record:{ ...this.newEvent }, eventsTable: this.eventsTable }
    });
    dialogRef.afterClosed().subscribe((result: EventData|undefined) => {
      
      if (result) {
        this.eventsTable.renderRows();
      }
      this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
    });    
  }

  public addNewEvent(newEventData: EventData): void {
    const newEvent: EventData = {
      event_id: 0, 
      names: newEventData.names,
      date: newEventData.date,
      location:newEventData.location,
      description: newEventData.description,
      
    };
    this.eventservice.addEvent(this.newEvent).subscribe(
      (response: EventData) => {
        
        this.event.push(response);
        this.eventsTable.renderRows(); 
      },
      
    );
  }

  public updateExistingEvent(event_id: number):void {
      const existingEvent = this.event.find((item) => item.event_id === event_id);
      if (existingEvent) {
        const dialogRef = this.dialog.open(EventformComponent, {
          width: '400px',
          data: { editMode: true, record: existingEvent }
        });
  
        dialogRef.afterClosed().subscribe((result:EventData | undefined) => {
          if (result) {
            const index = this.event.findIndex((item) => item.event_id === result.event_id);
            if (index !== -1) {
              this.event[index] = result;
              this.eventsTable.renderRows();
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
            }
          
          (error) => {
            this.toastservice.showToast(TOAST_STATE.danger, 'Enable to edit ID :');
          }
        }
          if (result) {
            this.updateEvent(result);
          }
          
        });
        
      } 
    }
  
  public updateEvent(updatedEvent: EventData): void {
    this.eventservice.updateEvent(updatedEvent).subscribe(
      (response: EventData) => {
        
        this.eventsTable.renderRows();

      },
     
    );
  }
  public deleteEvent(event_id: number):void {
    const dialogRef = this.dialog.open(DeleteconfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this course?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.eventservice.deleteEvent(event_id).subscribe(
          () => {
            this.event = this.event.filter((item) => item.event_id !== event_id);
            this.eventsTable.renderRows();
            this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
          },
          (error) => {
            
            this.toastservice.showToast(
              TOAST_STATE.danger,
              `Error occurred while deleting Item: ${error}`
            );
          }
        );
      }
    });
  }
}