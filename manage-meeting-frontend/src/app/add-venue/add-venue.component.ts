import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Venue} from '../model/venue.model';
import {VenueService} from '../service/venue-service/venue.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ActivatedRoute, Route, Router} from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {
  form: FormGroup;
  venueId: string;

  venue: Venue = new Venue();
  facilityList: string[] = [];

  constructor(private venueService: VenueService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: Router,
              private router: ActivatedRoute) {
    this.venueId = this.router.snapshot.paramMap.get('id');
    if (this.venueId) {
      this.venueService.getById(this.venueId).subscribe((v) => {
        this.venue = v;
        this.facilityList = this.venue.facilityList;
        this.form = this.createForm();
      });
    }
  }

  ngOnInit() {
    this.createForm();

  }

  /*ngAfterViewInit(): void {
    this.getVenueById(this.venueId);
  }*/

  /*public getVenueById(venueId: string): any {
    if (venueId) {
      this.venueService.getById(venueId).subscribe(
        (v) => {
          this.venue = v;
          this.facilityList = this.venue.facilityList;
          this.form = this.createForm();
        });
    }
  }*/

  createForm(): FormGroup {
    return this.form = this.formBuilder.group({
      venueId: [this.venue.venueId, Validators.required],
      capacity: [this.venue.capacity,
        [Validators.required, CustomValidators.number]],
      facilities: [null]
    });
  }

  addFacility(): any {
    this.facilityList.push(this.form.get('facilities').value);
    this.form.get('facilities').reset();
  }


  createVenue(venue: Venue): void {
    if (this.venueId)
    { venue.facilityList = this.facilityList;
      this.venueService.updateVenue(this.venueId, venue).subscribe(data => {
      this.showUpdateNotification('top', 'right');
        this.route.navigate(['/venue-list']); }); }
   else {
    venue.facilityList = this.facilityList;
    this.venueService.createVenue(venue)
      .subscribe(data => {
        this.form.reset();
        this.facilityList = [];
        this.showSaveNotification('top', 'right');
        this.route.navigate(['/venue-list']);
      }); }
  }

  public removeFacilityList(index: number): any {
    this.facilityList.splice(Number(index), 1);
  }

  showSaveNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> successfully saved.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }
  showUpdateNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Succesfully updated.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }

}
