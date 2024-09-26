import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {finalize} from "rxjs";
import {EigenschappenService} from "../../service/eigenschappen.service";
import {EigenschapPagedresponseModel} from "../../model/eigenschappagedresponse.model";
import {BasePaginatedComponent} from "../../classes/base-paginated-component";

@Component({
  selector: 'app-zaaktypes-list',
  templateUrl: './eigenschappen.component.html',
  styleUrls: ['./eigenschappen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EigenschappenComponent extends BasePaginatedComponent implements OnInit {

  eigenschappen: EigenschapPagedresponseModel | null = null;

  constructor(private eigenschappenService: EigenschappenService) {
    super()
  }

  ngOnInit(): void {
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.eigenschappenService.getEigenschappenPaged(this.page)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.eigenschappen = result;
      });
  }
}
