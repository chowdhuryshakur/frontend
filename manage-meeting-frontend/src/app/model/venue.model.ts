import {Meeting} from './meeting.model';

export class Venue {
  public venueId: string;
  public capacity: number;
  public facilityList: string[];
  public meetingsList: Meeting[];

  constructor(venue?) {
    venue = venue || {};
    this.venueId = venue.venueId || null;
    this.capacity = venue.capacity || null;
    this.facilityList = venue.facilityList || null;
    this.meetingsList = venue.meetingsList || null;
  }
}
