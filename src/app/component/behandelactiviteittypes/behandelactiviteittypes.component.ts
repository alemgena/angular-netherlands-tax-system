import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {finalize} from "rxjs";
import {BijzondereBepalingtypeModel} from "../../model/bijzondereBepalingtype.model";
import {BijzondereBepalingService} from "../../service/bijzondere-bepaling.service";
import {BehandelactiviteittypepagedModel} from "../../model/behandelactiviteittypepaged.model";
import {BehandelactiviteittypeConceptService} from "../../service/behandelactiviteittype-concept.service";
import {CatalogusService} from "../../service/catalogus.service";
import {BasePaginatedComponent} from "../../classes/base-paginated-component";

@Component({
  templateUrl: './behandelactiviteittypes.component.html',
  styleUrls: ['./behandelactiviteittypes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BehandelactiviteittypesComponent extends BasePaginatedComponent implements OnInit {

  behandelactiviteittypes: BehandelactiviteittypepagedModel | null = null;

  constructor(private catalogusService: CatalogusService) {
    super();
  }

  ngOnInit(): void {
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.catalogusService.getBehandelactiviteittypesPaged(this.page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.behandelactiviteittypes = result;
      });
  }

}
