import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Title} from '@angular/platform-browser';
import {BehandelactiviteittypeModel} from "../../../model/behandelactiviteittype.model";
import {BehandelactiviteittypeConceptService} from "../../../service/behandelactiviteittype-concept.service";

@Component({
  selector: 'app-zaaktype-vaststellen',
  templateUrl: './behandelactiviteittype-vaststellen.html',
  styleUrls: ['./behandelactiviteittype-vaststellen.css']
})
export class BehandelactiviteittypeVaststellen implements OnInit {
  loading: boolean = true;
  behandelactiviteittype: BehandelactiviteittypeModel | null = null;

  constructor(private behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private titleService: Title) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');

      if (code === null) {
        this.router.navigate(['/behandelactiviteittype-concepten']);
        return;
      }

      this.behandelactiviteittypeConceptService.setTypeCode(code)
      this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit()
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(result => {
          this.behandelactiviteittype = result;
          this.titleService.setTitle(`CATALOGUS - Behandelactiviteittype ${this.behandelactiviteittype.code} - ${this.behandelactiviteittype.omschrijving}`);
        });
    })
  }

  goBack() : void {
    this.location.back();
  }

  vaststellen(): void {
    this.loading = true;
    const code = this.route.snapshot.paramMap.get('code');

    if (code === null) {
      this.router.navigate(['/behandelactiviteittype-concepten']);
      return;
    }

    this.behandelactiviteittypeConceptService.finializeBehandelactiviteittypeConcept(code)
      .subscribe(() => {
        this.router.navigate(['/behandelactiviteittypes/' + code]);
      });
  }
}
