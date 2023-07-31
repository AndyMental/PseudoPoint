import { Component, OnInit,ViewChild } from '@angular/core';
import { HistoryEvents } from '../shared/model/event';
import { HistoryEventsService } from '../shared/services/history-events.service';
import { TOAST_STATE, ToastService } from '../shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeventFormComponent } from './hevent-form/hevent-form.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent  implements OnInit{
  @ViewChild(MatTable) myTable!: MatTable<any>;
 public historicalEvents: HistoryEvents[]=[];
 public editMode:boolean=false;
 public editedEvent: HistoryEvents= null;
 public showDeleteConfirmationModal:boolean=false;
 public eventToDelete:number;
 
 constructor(private historicalEventService:HistoryEventsService, 
  private toastservice:ToastService,
   private dialog: MatDialog,
   private snackBar: MatSnackBar) {}
   public dataSource: MatTableDataSource<HistoryEvents>;

   ngOnInit():void{
      this.getAllHistoricalEvents();
      this.dataSource = new MatTableDataSource<HistoryEvents>(this.historicalEvents);
   }
  private getAllHistoricalEvents():void{
        this.historicalEventService.getAllHistoricalEvents().subscribe((event)=>{
          this.historicalEvents=event;
        })
      }

    public  deleteEvent(ID: number):void {
        this.eventToDelete = ID;
        this.showDeleteConfirmationModal = true;
      }
      
   public   closeDeleteConfirmationModal():void {
        this.showDeleteConfirmationModal = false;
      }
      
    public  deleteItemConfirmed():void {
        this.showDeleteConfirmationModal = false;
        this.historicalEventService.deleteHistoricalEvent(this.eventToDelete).subscribe(
          () => {
            this.historicalEvents = this.historicalEvents.filter((item) => item.ID !== this.eventToDelete);
            this.toastservice.showToast(TOAST_STATE.success, 'Deleted Successfully');
          },
          (error) => {
            this.toastservice.showToast(TOAST_STATE.danger, `Error occurred while deleting Item: ${error}`);
          }
        );
      }
    public  openFormDialog(editMode: boolean, eventEntry?: HistoryEvents): void {
        const dialogRef = this.dialog.open(HeventFormComponent, {
          width: '300px',
          data: {
            editMode: editMode,
            eventEntry: eventEntry? eventEntry: null,
            historicalEvents: this.historicalEvents 
          }
        });
    
        dialogRef.afterClosed().subscribe((result:HistoryEvents) => {
          if (result) {
            if (editMode) {
              this.onUpdateHistoryEvent(result);
            } else {
              this.onAddNewHistoricalEvent(result);
            }
          }
        });
      }

public onAddNewHistoricalEvent(newEventEntry:HistoryEvents):void{
  this.historicalEventService.createHistoricalEvent(newEventEntry).subscribe((
    response:HistoryEvents)=>{
      {
        this.historicalEvents.push(response);
        this.dataSource.data = this.historicalEvents;
      }
      this.toastservice.showToast(TOAST_STATE.success, 'Data Added Successfully');
      },
      (error) => {
        this.toastservice.showToast(TOAST_STATE.danger, error.detail['msg']);
      }
  );
}

 public onUpdateHistoryEvent(updateEvent:HistoryEvents):void{
  this.historicalEventService.updateHistoricalEvent(updateEvent).subscribe(()=>
  {
    const index=this.historicalEvents.findIndex((item)=>item.ID===updateEvent.ID);
    if(index!==-1){
      this.historicalEvents[index]=updateEvent;
      this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
    }
    this.editedEvent=null;
  },
  (error)=>{
    this.toastservice.showToast(TOAST_STATE.danger, 'Not Able to edit ID ');
  }
  );
}
}
