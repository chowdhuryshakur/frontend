import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {InvitedMeetingComponent} from './invited-meeting.component';


describe('InvitedMeetingComponent', () => {
  let component: InvitedMeetingComponent;
  let fixture: ComponentFixture<InvitedMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
