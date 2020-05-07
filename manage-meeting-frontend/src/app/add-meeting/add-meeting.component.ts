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
  selectedEmployee: Employee;
  showSpinner = true;
  showSpinner1 = false;
  constructor(private meetingService: MeetingService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: Router,
              private router: ActivatedRoute,
              private venueService: VenueService,
              private employeeService: EmployeeService) {
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
      dateAndTime: [this.meeting.dateAndTime, Validators.required],
      duration: [this.meeting.duration, [Validators.required, CustomValidators.number]],
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
