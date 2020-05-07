import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Venue} from '../model/venue.model';
import {Employee} from '../model/employee.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../service/employee-service/employee.service';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  employeeId: string;

  employee: Employee = new Employee();
  showSpinner = true;
  showSpinner1 = false;
  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: Router,
              private router: ActivatedRoute) {
    this.employeeId = this.router.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getById(this.employeeId).subscribe((e) => {
        this.employee = e;
        this.form = this.createForm();
        this.showSpinner = false;
      });} else { this.showSpinner = false; }
  }

  ngOnInit() {
    this.createForm();
  }
  createForm(): FormGroup {
    return this.form = this.formBuilder.group({
      employeeId: [this.employee.employeeId, Validators.required],
      name: [this.employee.name, [Validators.required ]],
      designation: [this.employee.designation, Validators.required],
      department: [this.employee.department, Validators.required],
      mail: [this.employee.mail, [Validators.required, Validators.email]]
    });
  }


  createVenue(employee: Employee): void {
    this.showSpinner1 = true;
    if (this.employeeId)
    {
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe(data => {
        this.showUpdateNotification('top', 'right');
        this.route.navigate(['/employees']);}); }
    else {
      this.employeeService.createEmployee(employee)
        .subscribe(data => {
          this.form.reset();
          this.showSaveNotification('top', 'right');
          this.route.navigate(['/employees']);}); }
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
