import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Venue} from '../model/venue.model';
import {DataTableResource} from 'angular7-data-table';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Meeting} from '../model/meeting.model';
import {MeetingService} from '../service/meeting-service/meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  meetingList: Meeting[];
  filterList: Meeting[];
  tableResource: DataTableResource<Meeting>;
  items: Meeting[] = [];
  itemCount: number;
  showSpinner = true;
  constructor(private meetingService: MeetingService,
              private toastr: ToastrService,
              private route: Router) {
    this.subscription = this.meetingService.getAll()
    .subscribe(meeting => {
      this.filterList = this.meetingList = meeting;
      this.initializeTable(meeting);
      this.showSpinner = false;
    });
  }
  private initializeTable(meetings: Meeting[]) {
    this.tableResource = new DataTableResource(meetings);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  ngOnInit() {
  }
  ngOnDestroy()  {
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

  deleteMeeting(meeting: Meeting) {
    this.showSpinner = true;
    if (!confirm('Are you sure?')) {
      return; }
    this.showDeleteNotification('top', 'right');
    this.meetingService.deleteMeeting(meeting)
      .subscribe(response => {});
    setTimeout(() => {location.reload(); }, 1500);
  }

  showDeleteNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> successfully deleted.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });

  }
  public getAll(): void {
    this.meetingService.getAll().subscribe(
      response => {
        this.meetingList = response;
      }
    );
  }
}
