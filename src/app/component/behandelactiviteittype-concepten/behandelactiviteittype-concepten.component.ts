import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {finalize} from "rxjs";
import {BehandelactiviteittypepagedModel} from "../../model/behandelactiviteittypepaged.model";
import {CatalogusService} from "../../service/catalogus.service";
import {BasePaginatedComponent} from "../../classes/base-paginated-component";
import {RoleGroupsModel} from "../../model/role-groups.model";
import {AuthService} from "../../service/auth.service";

@Component({
  templateUrl: './behandelactiviteittype-concepten.component.html',
  styleUrls: ['./behandelactiviteittype-concepten.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BehandelactiviteittypeConceptenComponent extends BasePaginatedComponent implements OnInit {
  behandelactiviteittypes: BehandelactiviteittypepagedModel | null = null;

  constructor(private catalogusService: CatalogusService, protected authService: AuthService) {
    super()
  }

  ngOnInit(): void {
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.catalogusService.getBehandelactiviteittypeConceptenPaged(this.page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.behandelactiviteittypes = result;
      });
  }

  protected readonly RoleGroupsModel = RoleGroupsModel;
}
