import {Component, OnDestroy, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AppService} from '../service/app.service';
import {Subscription} from 'rxjs';
import {Meeting} from '../model/meeting.model';
import {DataTableResource} from 'angular7-data-table';
import {MeetingService} from '../service/meeting-service/meeting.service';
import {Router} from '@angular/router';
import {Employee} from '../model/employee.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-notifications',
  templateUrl: './invited-meeting.component.html',
  styleUrls: ['./invited-meeting.component.css']
})
export class InvitedMeetingComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  meetingList: Meeting[] = [];
  filterList: Meeting[] = [];
  tableResource: DataTableResource<Meeting>;
  items: Meeting[] = [];
  itemCount: number;
  tempMeeting: Meeting  = new Meeting();
  constructor(private meetingService: MeetingService) {
    this.subscription = this.meetingService.getAll()
    .subscribe(meetings => {
      for(let meeting of meetings)
      {for (let employee of meeting.employeeList) {
        if (employee.name.toLowerCase() === sessionStorage.getItem('username').toLowerCase())
        { this.tempMeeting = meeting;
          this.filterList.push(this.tempMeeting);
          this.meetingList.push(this.tempMeeting);
          this.initializeTable(this.meetingList); } } }
    });
    }

  private initializeTable(meetings: Meeting[]) {
    this.tableResource = new DataTableResource(meetings);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  public filter(query: String) {
    this.filterList = (query) ?
      this.meetingList.filter(m => m.meetingId.toLowerCase().includes(query.toLowerCase())) :
      this.meetingList;
    this.initializeTable(this.filterList);
  }
}
