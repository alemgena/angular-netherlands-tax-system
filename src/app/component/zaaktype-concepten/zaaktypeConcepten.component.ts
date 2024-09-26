import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CatalogusService} from "../../service/catalogus.service";
import {finalize} from "rxjs";
import {ZaaktypePagedresponseModel} from "../../model/zaaktypepagedresponse.model";
import {AuthService} from "../../service/auth.service";
import {RoleGroupsModel} from "../../model/role-groups.model";
import {BasePaginatedComponent} from "../../classes/base-paginated-component";

@Component({
  selector: 'app-zaaktypes-list',
  templateUrl: './zaaktypeConcepten.component.html',
  styleUrls: ['./zaaktypeConcepten.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ZaaktypeConceptenComponent extends BasePaginatedComponent implements OnInit {

  zaaktypes: ZaaktypePagedresponseModel | null = null;

  constructor(
    private catalogusService: CatalogusService,
    protected authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.page = 0
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.catalogusService.getZaaktypeConceptenPaged(this.page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.zaaktypes = result;
      });
  }

  protected readonly RoleGroupsModel = RoleGroupsModel;
}
