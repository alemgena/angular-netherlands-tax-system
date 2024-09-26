import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZaaktypeConceptStepService} from "../../../../service/zaaktype-concept-step.service";
import {TableConceptDataComponent} from "../../../concept-utils/table-concept-data/table-concept-data.component";
import {BehandelactiviteittypeConceptService} from "../../../../service/behandelactiviteittype-concept.service";

@Component({
  selector: 'app-zaaktype-table-concept-data',
  templateUrl: './../../../concept-utils/table-concept-data/table-concept-data.component.html',
  styleUrls: ['./../../../concept-utils/table-concept-data/table-concept-data.component.css']
})
export class ZaaktypeTableConceptData extends TableConceptDataComponent{

  constructor(protected route: ActivatedRoute, protected router: Router, protected curStepService: ZaaktypeConceptStepService, protected behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService) {
    super(route, router, curStepService, behandelactiviteittypeConceptService);
  }
}

