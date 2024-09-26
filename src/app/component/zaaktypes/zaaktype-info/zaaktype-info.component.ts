import {Component, Input} from '@angular/core';
import {ZaaktypeModel} from "../../../model/zaaktype/zaaktype.model";
import {ZaaktypeConceptStepService} from "../../../service/zaaktype-concept-step.service";
import {ColumnDataModel, Links} from "../../../model/columndata.model";


@Component({
  selector: 'app-zaaktype-info',
  templateUrl: './zaaktype-info.component.html',
  styleUrls: ['./zaaktype-info.component.css']
})
export class ZaaktypeInfoComponent {
  @Input() loading: boolean = true;
  @Input() zaaktype: ZaaktypeModel | null = null;

  aanLeidingKolommen: ColumnDataModel[] = [];
  statusKolommen: ColumnDataModel[] = [];
  rolkolommen: ColumnDataModel[] = [];
  resultaatKolommen: ColumnDataModel[] = [];
  behandelactiviteitenKolommen: ColumnDataModel[] = [];
  informatieobjectKolommen: ColumnDataModel[] = [];
  beschikkingenKolommen: ColumnDataModel[] = [];
  bijzondereBepalingKolommen: ColumnDataModel[] = [];
  gerelateerdeZaakKolommen: ColumnDataModel[] = [];

  behandelactiveitenLinks: Links | null;


  constructor(private stepService: ZaaktypeConceptStepService) {
    this.aanLeidingKolommen = stepService.getColumnsForStep("aanleidingtypes");
    this.statusKolommen = stepService.getColumnsForStep("statustypes");
    this.rolkolommen = stepService.getColumnsForStep("roltypes");
    this.resultaatKolommen = stepService.getColumnsForStep("resultaattypes");
    this.behandelactiviteitenKolommen = stepService.getColumnsForStep("behandelactiviteittypes");
    this.informatieobjectKolommen = stepService.getColumnsForStep("informatieobjecttypes");
    this.beschikkingenKolommen = stepService.getColumnsForStep("beschikkingtypes");
    this.bijzondereBepalingKolommen = stepService.getColumnsForStep("bijzondere-bepalingen");
    this.gerelateerdeZaakKolommen = stepService.getColumnsForStep("gerelateerde-zaaktypes");

    this.behandelactiveitenLinks = stepService.getLinksForStep("behandelactiviteittypes");
  }
}
