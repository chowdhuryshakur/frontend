import {Meeting} from './meeting.model';
import {Employee} from './employee.model';
import {using} from 'rxjs';

export class Objection {

  public  id: string;
  public employee: Employee;
  public meeting: Meeting;
  public objection: string;

  constructor(objection?) {
    objection = objection || {};
    this.id = objection.id || {};
    this.employee = objection.employee || null;
    this.meeting = objection.meeting || null;
    this.objection = objection.objection || null;
  }
}
