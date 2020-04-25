import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ObjectionComponent } from '../../objection/objection.component';
import { TypographyComponent } from '../../typography/typography.component';
import {EmployeeComponent} from '../../employee/employee.component';
import {InvitedMeetingComponent} from '../../invited-meeting/invited-meeting.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {VenueListComponent} from '../../venue-list/Venue-list.component';
import {AddVenueComponent} from '../../add-venue/add-venue.component';
import {AddEmployeeComponent} from '../../add-employee/add-employee.component';
import {MeetingsComponent} from '../../meetings/meetings.component';
import {AddMeetingComponent} from '../../add-meeting/add-meeting.component';
import {AuthGaurdService} from '../../service/authgaurd-service/authguard.service';
import {Gaurd2Service} from '../../service/gaurd2-service/gaurd2.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [Gaurd2Service, AuthGaurdService]},
    { path: 'objection',   component: ObjectionComponent, canActivate: [Gaurd2Service, AuthGaurdService] },

    { path: 'meetings',     component: MeetingsComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'typography',     component: TypographyComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'employees',           component: EmployeeComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'invited-meeting',  component: InvitedMeetingComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'venue-list',  component: VenueListComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'venue',        component: AddVenueComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'venue/:id',        component: AddVenueComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'employee',        component: AddEmployeeComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'employee/:id',        component: AddEmployeeComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'meeting',        component: AddMeetingComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
    { path: 'meeting/:id',        component: AddMeetingComponent, canActivate: [Gaurd2Service, AuthGaurdService] },
  { path: 'user/objection',   component: ObjectionComponent, canActivate: [AuthGaurdService]},
  { path: 'user/invited-meeting',  component: InvitedMeetingComponent, canActivate: [AuthGaurdService] }


];
