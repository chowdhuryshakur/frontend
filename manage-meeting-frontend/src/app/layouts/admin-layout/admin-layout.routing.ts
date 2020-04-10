import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import {EmployeeComponent} from '../../employee/employee.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {VenueListComponent} from '../../venue-list/Venue-list.component';
import {AddVenueComponent} from '../../add-venue/add-venue.component';
import {AddEmployeeComponent} from '../../add-employee/add-employee.component';
import {MeetingsComponent} from '../../meetings/meetings.component';
import {AddMeetingComponent} from '../../add-meeting/add-meeting.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'meetings',     component: MeetingsComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'employees',           component: EmployeeComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'venue-list',  component: VenueListComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'venue',        component: AddVenueComponent },
    { path: 'venue/:id',        component: AddVenueComponent },
    { path: 'employee',        component: AddEmployeeComponent },
    { path: 'employee/:id',        component: AddEmployeeComponent },
    { path: 'meeting',        component: AddMeetingComponent },
    { path: 'meeting/:id',        component: AddMeetingComponent }

];
