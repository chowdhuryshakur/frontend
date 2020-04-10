import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Venue} from '../model/venue.model';
import {VenueService} from '../service/venue-service/venue.service';
import {ToastrService} from 'ngx-toastr';
import {Subscribable, Subscription} from 'rxjs';
import {DataTableResource} from 'angular7-data-table';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  venueList: Venue[];
  filterList: Venue[];
  tableResource: DataTableResource<Venue>;
  items: Venue[] = [];
  itemCount: number;

  constructor(private venueService: VenueService,
              private toastr: ToastrService,
              private route: Router) {
    this.subscription = this.venueService.getAll()
      .subscribe(venue => {
        this.filterList = this.venueList = venue;
        this.initializeTable(venue);
      });
  }

  private initializeTable(venues: Venue[]) {
    this.tableResource = new DataTableResource(venues);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   public reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  public filter(query: String) {
    this.filterList = (query) ?
      this.venueList.filter(v => v.venueId.toLowerCase().includes(query.toLowerCase())) :
      this.venueList;
    this.initializeTable(this.filterList);
  }

  deleteVenue(venue: Venue) {
    if (!confirm('Are you sure?')) {
      return; }

    this.venueService.deleteVenue(venue)
      .subscribe(response => {
        this.redirectTo('/venue-list');
        this.showDeleteNotification('top', 'right');});
  }
  redirectTo(uri: string){
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.route.navigate([uri]));
  }
  showDeleteNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> successfully deleted.', '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });

  }
  public getAll(): void {
    this.venueService.getAll().subscribe(
      response => {
        this.venueList = response;
      }
    );
  }

}
