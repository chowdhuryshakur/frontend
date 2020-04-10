import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Venue} from '../model/venue.model';
import {DataTableResource} from 'angular7-data-table';
import {Employee} from '../model/employee.model';
import {VenueService} from '../service/venue-service/venue.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee-service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employeeList: Employee[];
  filterList: Employee[];
  tableResource: DataTableResource<Employee>;
  items: Employee[] = [];
  itemCount: number;

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService,
              private route: Router) {
    this.subscription = this.employeeService.getAll()
      .subscribe(employee => {
        this.filterList = this.employeeList = employee;
        this.initializeTable(employee);
      });
  }
  private initializeTable(employees: Employee[]) {
    this.tableResource = new DataTableResource(employees);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
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
      this.employeeList.filter(e => e.employeeId.toLowerCase().includes(query.toLowerCase())) :
      this.employeeList;
    this.initializeTable(this.filterList);
  }

  deleteEmployee(employee: Employee) {
    if (!confirm('Are you sure?')) {
      return; }

    this.employeeService.deleteEmployee(employee)
      .subscribe(response => {
        this.redirectTo('/employees');
        this.showDeleteNotification('top', 'right');});
  }
  redirectTo(uri: string){
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.route.navigate([uri]));
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
    this.employeeService.getAll().subscribe(
      response => {
        this.employeeList = response;
      }
    );
  }


}
