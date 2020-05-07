import {Component, OnInit} from '@angular/core';
import {AppService} from '../service/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ObjectionService} from '../service/objection-service/objection-service.service';
import {Meeting} from '../model/meeting.model';
import {Objection} from '../model/objection.model';
import {MeetingService} from '../service/meeting-service/meeting.service';
import {Employee} from '../model/employee.model';
import {EmployeeService} from '../service/employee-service/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './objection.component.html',
  styleUrls: ['./objection.component.css']
})
export class ObjectionComponent implements OnInit {
  form: FormGroup;
  obj: Objection = new Objection();
  meetings: Meeting[] = [];
  employees: Employee[] = [];
  tempMeeting: Meeting = new Meeting();
  showSpinner = false;
  constructor(private appService: AppService,
              private employeeService: EmployeeService,
              private objectionService: ObjectionService,
              private meetingService: MeetingService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {
    this.employeeService.getAll().subscribe(e => {
      this.employees = e;
    });
    this.meetingService.getAll().subscribe(meetings => {
      for (const meeting of meetings) {
        for (const employee of meeting.employeeList) {
          if (employee.name.toLowerCase() === sessionStorage.getItem('username').toLowerCase()) {
            this.tempMeeting = meeting;
            this.meetings.push(this.tempMeeting);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): FormGroup {
    if (this.obj.meeting == null) {
      this.obj.meeting = new Meeting();
    }
    /*if (this.obj.employee == null) {
      this.obj.employee = new Employee();
    }*/
    return this.form = this.formBuilder.group({
      meeting: this.formBuilder.group({
        meetingId: [this.obj.meeting.meetingId, [Validators.required]]
      }),
      objection: [this.obj.objection, Validators.required]
    });
  }

  createObjection(obj: Objection): void {
    this.showSpinner = true;
    obj.employee = this.employees.find(employee =>
      employee.name.toLowerCase().includes(sessionStorage.getItem('username').toLowerCase()));
    obj.meeting = this.meetings.find(meeting =>
      meeting.meetingId.toLowerCase().includes(this.form.get('meeting.meetingId').value.toLowerCase()));
    this.objectionService.createObjection(obj)
      .subscribe(data => {
        this.form.reset();
        this.showSaveNotification('top', 'right');
        this.showSpinner = false;
      });
  }

  showSaveNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> successfully stored.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }

  getUser() {
    return this.appService.getUser();
  }
}
