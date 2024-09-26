import {Component} from "@angular/core";
import {TableConceptDataComponent} from "../../../concept-utils/table-concept-data/table-concept-data.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  BehandelactiviteittypeConceptStepService
} from "../../../../service/behandelactiviteittype-concept-step.service";
import {BehandelactiviteittypeConceptService} from "../../../../service/behandelactiviteittype-concept.service";

@Component({
  selector: 'app-behandelactiviteittype-table-concept-data',
  templateUrl: '../../../concept-utils/table-concept-data/table-concept-data.component.html',
  styleUrls: ['../../../concept-utils/table-concept-data/table-concept-data.component.css']
})
export class BehandelactiviteittypeTableConceptDataComponent extends TableConceptDataComponent{

  constructor(protected route: ActivatedRoute, protected router: Router, protected curStepService: BehandelactiviteittypeConceptStepService, protected behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService) {
    super(route,router, curStepService, behandelactiviteittypeConceptService);
  }
}
