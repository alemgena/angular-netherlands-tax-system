import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Title} from '@angular/platform-browser';
import {ZaaktypeModel} from "../../../model/zaaktype/zaaktype.model";
import {CatalogusService} from "../../../service/catalogus.service";

@Component({
  selector: 'app-zaaktype-vaststellen',
  templateUrl: './zaaktype-vaststellen.html',
  styleUrls: ['./zaaktype-vaststellen.css']
})
export class ZaaktypeVaststellen implements OnInit {
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
      this.router.navigate(['/zaaktype-concepten']);
      return;
    }

    this.catalogusService.getZaaktypeConcept(code)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.zaaktype = result;
        this.titleService.setTitle(`CATALOGUS - Zaaktype ${this.zaaktype.code} - ${this.zaaktype.omschrijving}`);
      });
  }

  goBack() : void {
    this.router.navigate(['/zaaktype-concepten']);
  }

  vaststellen(): void {
    this.loading = true;
    const code = this.route.snapshot.paramMap.get('code');

    if (code === null) {
      this.router.navigate(['/zaaktype-concepten']);
      return;
    }

    this.catalogusService.finializeZaaktypeConcept(code)
      .subscribe(() => {
        this.router.navigate(['/zaaktypes/' + code]);
      });
  }
}
