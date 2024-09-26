import {inject, Injectable} from "@angular/core";
import {BaseStepService} from "./base-step.service";
import {ModalColumnData, ModalComponentData} from "../model/modal-component-data";
import {ReferentielijstenSelectBoxOptionsService} from "./selectbox/referentie-lijsten-select-box-options.service";
import {BooleanSelectBoxOptionsService} from "./selectbox/boolean-select-box-options.service";
import {BetrokkeneTypeSelectBoxOptionsService} from "./selectbox/betrokkene-type-select-box-options.service";
import {ActivatedRoute} from "@angular/router";
import {BehandelactiviteittypeModel} from "../model/behandelactiviteittype.model";
import {BehandelactiviteittypeConceptService} from "./behandelactiviteittype-concept.service";
import {mergeMap, of} from "rxjs";
import {EigenschapSelectBoxOptionsService} from "./selectbox/eigenschap-select-box-options.service";
import {Links} from "../model/columndata.model";

@Injectable({
  providedIn: 'root'
})
export class BehandelactiviteittypeConceptStepService extends BaseStepService<BehandelactiviteittypeModel> {

  columns: {[key: string]: ModalColumnData} = {
    statustypes: {title: 'Statustypes', fields: [
        {key: 'omschrijving', name:'Omschrijving'},
        {key: 'volgnummer', name: "Volgnummer"},
        {key: 'informeren', name:'Informeren'},
        {key: 'statustekst', name:'Statustekst'}
      ]
    }, roltypes: {title: 'Roltypes', fields: [
        {key: 'omschrijving', name:'Omschrijving'},
        {key: 'betrokkene', name:'Betrokkene'}
      ]
    }, resultaattypes: {title: 'Resultaattypes', fields: [
        {key: 'omschrijving', name: "Omschrijving"},
      ]
    }, eigenschappen: {title: 'Eigenschappen', fields: [
        {key: 'naam', name: "Naam"},
        {key: 'toelichting', name: "Toelichting"}
      ]
    }
  }

  modalData: {[key: string]: ModalComponentData} = {
    statustypes: {title: 'Statustypes', deleteEndpointTitle: 'statustype', fields: [
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Statustypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('statustypes')},
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Statustypes', name:'Omschrijving'},
        {fieldType: 'Text', inputType: 'number', required: true, type: 'Statustypes', name: "Volgnummer"},
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Statustypen', name:'Informeren',
          selectBoxOptions: inject(BooleanSelectBoxOptionsService).getObservableSelectBoxOptions()},
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Statustypes', name:'Statustekst'}
      ]
    }, roltypes: {title: 'Roltypes', deleteEndpointTitle: 'roltype', fields: [
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Roltypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('roltypes')},
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Roltypes', name:'Omschrijving'},
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Roltypes', name:'Betrokkene',
          selectBoxOptions: inject(BetrokkeneTypeSelectBoxOptionsService).getObservableSelectBoxOptions()}
      ]
    }, resultaattypes: {title: 'Resultaattypes', deleteEndpointTitle: 'resultaattype', fields: [
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Resultaattypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('resultaattypes')},
      ]
    }, eigenschappen: {title: 'Eigenschappen', deleteEndpointTitle: 'eigenschap', fields: [
        {fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Eigenschappen', name: "Eigenschappen",
          selectBoxOptions: inject(EigenschapSelectBoxOptionsService).getObservableSelectBoxOptions()},
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Eigenschappen', name:'Toelichting'}
      ]
    }
  }

  protected links: { [key: string]: Links } = {};

  private selectedReferentieBehandelactiviteittypeUUID: string | null = null;

  constructor(
    private behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService
  ) {
    super()
  }

  setCodeAfterReloadFor(route: ActivatedRoute) {
    return of(route.pathFromRoot[1]?.paramMap.subscribe((params) => {
      this.typeCode = params.get('code') ?? 'nieuw';
      this.setCurrentBehandelactiviteittypeModelFor(this.typeCode);
    }));
  }

  setBehandelactiviteitypeAfterCreate() {
    this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit().subscribe(ba => {
      this.type = ba
      this.typeCode = this.type.code ?? "";
    });
  }

  getCode() {
    return this.typeCode;
  }

  private setCurrentBehandelactiviteittypeModelFor(code: string) {
    if (this.type) {
      return;
    }

    this.behandelactiviteittypeConceptService.setTypeCode(code);
    this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit().subscribe((ba) => {
      this.type = ba
      this.selectedReferentieBehandelactiviteittypeUUID = ''
    })
  }

  getListOfObjects() {
    return this.behandelactiviteittypeConceptService.getConceptListForStep(this.stepTitle);
  }

  initialiseStep() {
    return this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit().pipe(mergeMap(model => {
      this.initialiseStepModel();
      return of(model);
    }))
  }

  add(model: any, uuid: string) {
    this.behandelactiviteittypeConceptService.add(model, this.stepTitle, uuid)
  }
}
