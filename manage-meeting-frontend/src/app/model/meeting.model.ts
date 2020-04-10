import {Venue} from './venue.model';
import {Employee} from './employee.model';

export class Meeting {
  public meetingId: string;
  public venue: Venue;
  public subject: string;
  public dateAndTime: Date;
  public duration: number;
  public employeeList: Employee;

  constructor(meeting?) {
    meeting = meeting || {};
    this.meetingId = meeting.meetingId || null;
    this.venue = meeting.venue || null;
    this.subject = meeting.subject || null;
    this.dateAndTime = meeting.dateAndTime || null;
    this.employeeList = meeting.employeeList || null;
  }
}
