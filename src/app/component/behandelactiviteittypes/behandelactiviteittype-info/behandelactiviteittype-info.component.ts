import {Component, Input} from '@angular/core';
import {ColumnDataModel} from "../../../model/columndata.model";
import {BehandelactiviteittypeModel} from "../../../model/behandelactiviteittype.model";
import {BehandelactiviteittypeConceptStepService} from "../../../service/behandelactiviteittype-concept-step.service";


@Component({
  selector: 'app-behandelactiviteittype-info',
  templateUrl: './behandelactiviteittype-info.component.html',
  styleUrls: ['./behandelactiviteittype-info.component.css']
})
export class BehandelactiviteittypeInfoComponent {
  @Input() loading: boolean = true;
  @Input() behandelactiviteittype: BehandelactiviteittypeModel | null = null;

  statusKolommen: ColumnDataModel[] = [];
  rolkolommen: ColumnDataModel[] = [];
  resultaatKolommen: ColumnDataModel[] = [];
  eigenschapKolommen: ColumnDataModel[] = [];

  constructor(private stepService: BehandelactiviteittypeConceptStepService) {
    this.statusKolommen = stepService.getColumnsForStep("statustypes");
    this.rolkolommen = stepService.getColumnsForStep("roltypes");
    this.resultaatKolommen = stepService.getColumnsForStep("resultaattypes");
    this.eigenschapKolommen = stepService.getColumnsForStep("eigenschappen");
  }
}
