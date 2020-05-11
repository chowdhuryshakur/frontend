import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../model/employee.model';
import {Meeting} from '../model/meeting.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetingService} from '../service/meeting-service/meeting.service';
import {CustomValidators} from 'ng2-validation';
import {Venue} from '../model/venue.model';
import {VenueService} from '../service/venue-service/venue.service';
import {EmployeeService} from '../service/employee-service/employee.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {

  form: FormGroup;
  meetingId: string;

  meeting: Meeting = new Meeting();
  employeeList: Employee[] = [];

  venues: Venue[] = [];
  employees: Employee[] = [];
  meetings: Meeting[] = [];
  tempMeetings: Meeting[] = [];
  selectedEmployee: Employee;
  showSpinner = true;
  showSpinner1 = false;
  showSuggestion = false;
  constructor(private meetingService: MeetingService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: Router,
              private router: ActivatedRoute,
              private venueService: VenueService,
              private employeeService: EmployeeService,
              public datepipe: DatePipe) {
    this.meetingId = this.router.snapshot.paramMap.get('id');
    if (this.meetingId) {
      this.meetingService.getById(this.meetingId).subscribe((m) => {
        this.meeting = m;
        this.employeeList = m.employeeList;
        this.form = this.createForm();
        this.showSpinner = false;
      });
    } else { this.showSpinner = false; }
    this.venueService.getAll().subscribe(v => {
      this.venues = v;
    });
    this.employeeService.getAll().subscribe(e => {
      this.employees = e;
    });
    this.meetingService.getAll().subscribe(m => {
      this.meetings = m;
    });
  }
  ngOnInit() {
    this.createForm();
  }

  createForm(): FormGroup {
    if (this.meeting.venue == null) {
      this.meeting.venue = new Venue();
    }
    return this.form = this.formBuilder.group({
      meetingId: [this.meeting.meetingId, Validators.required],
      venue: [ this.meeting.venue.venueId, [Validators.required ]],
      subject: [this.meeting.subject, Validators.required],
      startDateAndTime: [this.meeting.startDateAndTime, Validators.required],
      endDateAndTime: [this.meeting.endDateAndTime, [Validators.required]],
      employees: [null]
    });
  }


  createMeeting(meeting: Meeting): void {
    this.showSpinner1 = true;
    if (this.meetingId) {
      meeting.venue = this.venues.find(venue =>
        venue.venueId.toLowerCase().includes(this.form.get('venue').value.toLowerCase()));
      meeting.employeeList = this.employeeList;
      this.meetingService.updateMeeting(this.meetingId, meeting).subscribe(data => {
        this.employeeList = [];
        this.showUpdateNotification('top', 'right');
        this.route.navigate(['/meetings']);});
        } else {
      meeting.venue = this.venues.find(venue =>
        venue.venueId.toLowerCase().includes(this.form.get('venue').value.toLowerCase()));
      meeting.employeeList = this.employeeList;
      this.meetingService.createMeeting(meeting)
        .subscribe(data => {
          this.employeeList = [];
          this.form.reset();
          this.showSaveNotification('top', 'right');
          this.route.navigate(['/meetings']);}); }
  }
  // show suggestions for venues and meetings.
  showSuggestions(inputMeeting: Meeting): any {
    this.showSuggestion = true;
    let start: Date = new Date(inputMeeting.startDateAndTime);
    let end: Date = new Date(inputMeeting.endDateAndTime);
    for (let meeting of this.meetings) {
      let tempStart: Date = new Date(meeting.startDateAndTime);
      let tempEnd: Date = new Date(meeting.endDateAndTime);
      if (start > tempStart) { if (start < tempEnd) this.tempMeetings.push(meeting);}
      else if (start < tempStart) {if (tempStart < end) this.tempMeetings.push(meeting);}
      else if (tempStart === start) {this.tempMeetings.push(meeting);}
    }
    for(let venue of this.venues){
      for(let meeting of this.tempMeetings)
        if(meeting.venue.venueId === venue.venueId)
          this.venues.splice(Number(this.venues.indexOf(venue)), 1);
    }
    for(let employee of this.employees){
      for(let meeting of this.tempMeetings)
        for(let employeem of meeting.employeeList)
          if(employeem.employeeId === employee.employeeId)
            this.employees.splice(Number(this.employees.indexOf(employee)), 1);
    }
  }
  addEmployee(): any {
   this.selectedEmployee = this.employees.find(emp =>
          emp.name.toLowerCase().includes(this.form.get('employees').value.toLowerCase()));
    this.employeeList.push(this.selectedEmployee);
    this.form.get('employees').reset();
  }
  public removeEmployeeList(index: number): any {
    this.employeeList.splice(Number(index), 1);
  }
  showSaveNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> successfully saved.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }
  showUpdateNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Succesfully updated.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }


}
