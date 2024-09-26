import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Title} from '@angular/platform-browser';
import {BehandelactiviteittypeModel} from "../../../model/behandelactiviteittype.model";
import {CatalogusService} from "../../../service/catalogus.service";

@Component({
  selector: 'app-behandelactiviteittype-info-wrapper',
  templateUrl: './behandelactiviteittype-info-wrapper.component.html',
  styleUrls: ['./behandelactiviteittype-info-wrapper.component.css']
})
export class BehandelactiviteittypeInfoWrapperComponent implements OnInit {
  loading: boolean = true;
  behandelactiviteittype: BehandelactiviteittypeModel | null = null;
  constructor(private catalogusService: CatalogusService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private titleService: Title) {}

  ngOnInit(): void {
    this.loading = true;
    const code = this.route.snapshot.paramMap.get('code');

    if (code === null) {
      this.router.navigate(['/behandelactiviteittypes']);
      return;
    }

    this.catalogusService.getBehandelactiviteittype(code)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.behandelactiviteittype = result;
        this.titleService.setTitle(`CATALOGUS - Behandelactiviteittype ${this.behandelactiviteittype.code} - ${this.behandelactiviteittype.omschrijving}`);
      });
  }

  goBack() : void {
    this.router.navigate(['/behandelactiviteittypes']);
  }
}
