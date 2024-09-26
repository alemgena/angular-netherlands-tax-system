import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReferentielijstenService} from "../../../../service/referentielijsten.service";
import {ZaaktypeConceptService} from "../../../../service/zaaktype-concept.service";
import {ZaaktypeConceptStepService} from "../../../../service/zaaktype-concept-step.service";
import {ZaaktypeModel} from "../../../../model/zaaktype/zaaktype.model";

@Component({
  selector: 'zaaktype-overzicht-step',
  templateUrl: './zaaktype-overzicht-step.component.html',
  styleUrls: ['./zaaktype-overzicht-step.component.css']
})
export class ZaaktypeOverzichtStepComponent implements OnInit {
  loading: boolean = true;
  zaaktype: ZaaktypeModel | null = null;

  constructor(private route: ActivatedRoute,
              private referentielijstenService: ReferentielijstenService,
              private zaaktypeConceptService: ZaaktypeConceptService,
              private router: Router,
              private stepService: ZaaktypeConceptStepService
  ) {
  }

  ngOnInit(): void {
    this.stepService.setCodeAfterReloadFor(this.route);
    this.zaaktype = this.zaaktypeConceptService.getZaaktype();
  }
}
