import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ObjectionComponent } from '../../objection/objection.component';
import { TypographyComponent } from '../../typography/typography.component';
import {EmployeeComponent} from '../../employee/employee.component';
import {InvitedMeetingComponent} from '../../invited-meeting/invited-meeting.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {VenueListComponent} from '../../venue-list/Venue-list.component';
import {AddVenueComponent} from '../../add-venue/add-venue.component';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular7-data-table';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import {AddEmployeeComponent} from '../../add-employee/add-employee.component';
import {MeetingsComponent} from '../../meetings/meetings.component';
import {AddMeetingComponent} from '../../add-meeting/add-meeting.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    CustomFormsModule,
    DataTableModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  declarations: [
    DashboardComponent,
    MeetingsComponent,
    ObjectionComponent,
    VenueListComponent,
    UpgradeComponent,
    TypographyComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    InvitedMeetingComponent,
    AddVenueComponent,
    AddMeetingComponent
  ]
})

export class AdminLayoutModule {}
