import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CatalogusService} from "../../service/catalogus.service";
import {finalize} from "rxjs";
import {ZaaktypePagedresponseModel} from "../../model/zaaktypepagedresponse.model";
import {BasePaginatedComponent} from "../../classes/base-paginated-component";

@Component({
  selector: 'app-zaaktypes-list',
  templateUrl: './zaaktypes.component.html',
  styleUrls: ['./zaaktypes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ZaaktypesComponent extends BasePaginatedComponent implements OnInit {

  zaaktypes: ZaaktypePagedresponseModel | null = null;

  constructor(private catalogusService: CatalogusService) {
    super();
  }

  ngOnInit(): void {
    this.page = 0
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.catalogusService.getZaaktypesPaged(this.page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.zaaktypes = result;
      });
  }

}
