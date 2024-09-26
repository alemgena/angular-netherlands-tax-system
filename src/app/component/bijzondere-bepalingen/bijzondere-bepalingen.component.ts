import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {finalize} from "rxjs";
import {BijzondereBepalingtypeModel} from "../../model/bijzondereBepalingtype.model";
import {BijzondereBepalingService} from "../../service/bijzondere-bepaling.service";

@Component({
  templateUrl: './bijzondere-bepalingen.component.html',
  styleUrls: ['./bijzondere-bepalingen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BijzondereBepalingenComponent implements OnInit {

  bijzondereBepalingen: BijzondereBepalingtypeModel[] | null = null;
  loading: boolean = true;

  constructor(private bijzondereBepalingService: BijzondereBepalingService) {
  }

  ngOnInit(): void {
    this.fetchCurrentPage()
  }

  fetchCurrentPage(): void {
    this.loading = true;
    this.bijzondereBepalingService.getBijzondereBepalingen()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.bijzondereBepalingen = result;
      });
  }

}
