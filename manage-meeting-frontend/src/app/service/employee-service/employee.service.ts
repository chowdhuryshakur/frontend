import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _employee_url = 'https://shakurbackend.herokuapp.com/api/v1/employees';

  constructor(private http: HttpClient) { }

  public deleteEmployee(employee) {
    let username='shakur'
    let password='1234'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete<Employee>(this._employee_url + '/' + employee.employeeId, {headers});
  }
  public createEmployee(employee) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<Employee>(this._employee_url, employee, {headers});
  }
  public updateEmployee(employeeId: String, employee) {
    let username= 'shakur'
    let password= '1234'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.put<Employee>(this._employee_url+ '/' + employeeId, employee, {headers});
  }
  getAll(): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(this._employee_url, { headers });
  }

  getById(employeeId: string): Observable<any> {
    let username = 'shakur';
    let password = '1234';
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Employee>(this._employee_url + '/' + employeeId, {headers});
  }

}
