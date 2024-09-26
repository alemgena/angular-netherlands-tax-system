import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReferentielijstenService} from "../../../../service/referentielijsten.service";
import {ZaaktypeConceptStepService} from "../../../../service/zaaktype-concept-step.service";
import {BehandelactiviteittypeConceptService} from "../../../../service/behandelactiviteittype-concept.service";
import {BehandelactiviteittypeModel} from "../../../../model/behandelactiviteittype.model";

@Component({
  selector: 'behandelactiviteittype-overzicht-step',
  templateUrl: './behandelactiviteittype-overzicht-step.component.html',
  styleUrls: ['./behandelactiviteittype-overzicht-step.component.css']
})
export class BehandelactiviteittypeOverzichtStepComponent implements OnInit {
  loading: boolean = true;
  behandelactiviteittype: BehandelactiviteittypeModel | null = null;

  constructor(private route: ActivatedRoute,
              private referentielijstenService: ReferentielijstenService,
              private behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService,
              private router: Router,
              private stepService: ZaaktypeConceptStepService
  ) {
  }

  ngOnInit(): void {
    this.stepService.setCodeAfterReloadFor(this.route).subscribe(() => {
      const code = this.stepService.getCode()

      if (code === null) {
        this.router.navigate(['/behandelactiviteittype-concepten']);
        return;
      }

      this.behandelactiviteittypeConceptService.setTypeCode(code)
      this.behandelactiviteittypeConceptService
        .getObservableBehandelactiviteit()
        .subscribe(ba => {
          this.behandelactiviteittype = ba;
          this.loading = false;
        });
    });


  }
}
