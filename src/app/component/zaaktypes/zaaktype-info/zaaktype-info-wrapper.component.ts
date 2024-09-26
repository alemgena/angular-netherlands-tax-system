import {Component, OnInit} from '@angular/core';
import {CatalogusService} from "../../../service/catalogus.service";
import {finalize} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Title} from '@angular/platform-browser';
import {ZaaktypeModel} from "../../../model/zaaktype/zaaktype.model";

@Component({
  selector: 'app-zaaktype-info-wrapper',
  templateUrl: './zaaktype-info-wrapper.component.html',
  styleUrls: ['./zaaktype-info-wrapper.component.css']
})
export class ZaaktypeInfoWrapperComponent implements OnInit {
  loading: boolean = true;
  zaaktype: ZaaktypeModel | null = null;
  constructor(private catalogusService: CatalogusService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private titleService: Title) {}

  ngOnInit(): void {
    this.loading = true;
    const code = this.route.snapshot.paramMap.get('code');

    if (code === null) {
      this.router.navigate(['/zaaktypes']);
      return;
    }

    this.catalogusService.getZaaktype(code)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.zaaktype = result;
        this.titleService.setTitle(`CATALOGUS - Zaaktype ${this.zaaktype.code} - ${this.zaaktype.omschrijving}`);
      });
  }

  goBack() : void {
    this.router.navigate(['/zaaktypes']);
  }
}
