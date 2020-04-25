import {Meeting} from './meeting.model';
import {Employee} from './employee.model';

export class Objection {
  public employee: Employee;
  public meeting: Meeting;
  public objection: string;

  constructor(objection?) {
    objection = objection || {};
    this.employee = objection.employee || null;
    this.meeting = objection.meeting || null;
    this.objection = objection.objection || null;
  }
}
