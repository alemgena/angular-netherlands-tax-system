import {Component, OnInit} from '@angular/core';
import {ReferentielijstenService} from "../../service/referentielijsten.service";
import {finalize} from "rxjs";
import {ReferentielijstModel} from "../../model/zaaktype/zaaktype-referentie.model";

@Component({
  selector: 'app-referentielijsten',
  templateUrl: './referentielijsten.component.html',
  styleUrl: './referentielijsten.component.css'
})
export class ReferentielijstenComponent implements OnInit{
  referentielijsten: ReferentielijstModel[] | null = null
  loading: boolean = true;
  constructor(private referentielijstenService: ReferentielijstenService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.referentielijstenService.getReferentielijst()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.referentielijsten = result.resultaten
      });
  }
}
