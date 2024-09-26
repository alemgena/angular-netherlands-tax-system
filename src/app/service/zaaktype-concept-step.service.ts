import {inject, Injectable} from "@angular/core";
import {ZaaktypeConceptService} from "./zaaktype-concept.service";
import {ModalColumnData, ModalComponentData} from "../model/modal-component-data";
import {ActivatedRoute} from "@angular/router";
import {ZaaktypeModel} from "../model/zaaktype/zaaktype.model";
import {
  BijzondereBepalingTypeSelectBoxOptionsService
} from "./selectbox/bijzondere-bepaling-type-select-box-options.service";
import {AardRelatieSelectBoxOptionsService} from "./selectbox/aard-relatie-select-box-options.service";
import {BetrokkeneTypeSelectBoxOptionsService} from "./selectbox/betrokkene-type-select-box-options.service";
import {RichtingSelectBoxOptionsService} from "./selectbox/richting-select-box-options.service";
import {ReferentielijstenSelectBoxOptionsService} from "./selectbox/referentie-lijsten-select-box-options.service";
import {BooleanSelectBoxOptionsService} from "./selectbox/boolean-select-box-options.service";
import {ZaaktypeSelectBoxOptionsService} from "./selectbox/zaaktype-select-box-options.service";
import {BaseStepService} from "./base-step.service";
import {mergeMap, of} from "rxjs";
import {
  BehandelactiviteittypeSelectBoxOptionService
} from "./selectbox/behandelactiviteittype-select-box-option.service";
import {isBehandelactiviteittypeModel} from "../model/behandelactiviteittype.model";
import {Links} from "../model/columndata.model";

@Injectable({
  providedIn: 'root'
})
export class ZaaktypeConceptStepService extends BaseStepService<ZaaktypeModel> {

  columns: { [key: string]: ModalColumnData } = {
    aanleidingtypes: {
      title: 'Aanleidingtypes', fields: [
        {key: 'omschrijving', name: 'Omschrijving'},
      ]
    }, behandelactiviteittypes: {
      title: 'Behandelactiviteittypes', fields: [
        {key: 'omschrijving', name: 'Omschrijving'},
        {key: 'code', name: "Code"},
        {key: 'uuid', name: "Uuid"},
        {key: 'toelichting', name: "Toelichting"}
      ]
    }, statustypes: {
      title: 'Statustypes', fields: [
        {key: 'omschrijving', name: 'Omschrijving'},
        {key: 'volgnummer', name: "Volgnummer"},
        {key: 'informeren', name: 'Informeren'},
        {key: 'statustekst', name: 'Statustekst'}
      ]
    }, roltypes: {
      title: 'Roltypes', fields: [
        {key: 'omschrijving', name: 'Omschrijving'},
        {key: 'betrokkene', name: 'Betrokkene'}
      ]
    }, informatieobjecttypes: {
      title: 'Informatieobjecttypes', fields: [
        {key: 'omschrijving', name: 'Omschrijving'},
        {key: 'volgnummer', name: "Volgnummer"},
        {key: 'richting', name: 'Richting'}
      ]
    }, resultaattypes: {
      title: 'Resultaattypes', fields: [
        {key: 'omschrijving', name: "Omschrijving"},
      ]
    }, beschikkingtypes: {
      title: 'Beschikkingtypes', fields: [
        {key: 'omschrijving', name: "Omschrijving"},
      ]
    }, "bijzondere-bepalingen": {
      title: 'Bijzondere bepalingen', fields: [
        {key: 'type', name: "Type"},
        {key: 'reden', name: 'Reden'},
        {key: 'aantal', name: "Aantal"},
        {key: 'eersteTermijn', name: "Eerste termijn"},
        {key: 'opvolgendeTermijn', name: "Opvolgende termijn"}
      ]
    }, "gerelateerde-zaaktypes": {
      title: 'Gerelateerde zaaktypes', fields: [
        {key: 'zaaktype', name: "Zaaktype"},
        {key: 'aardRelatie', name: 'Aard relatie'},
        {key: 'toelichting', name: "Toelichting"}
      ]
    }
  }

  modalData: { [key: string]: ModalComponentData } = {
    aanleidingtypes: {
      title: 'Aanleidingtypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Aanleidingtypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('aanleidingtypes')
        }
      ]
    }, behandelactiviteittypes: {
      title: 'Behandelactiviteittypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: "SelectBox",
          inputType: 'text',
          required: true,
          type: 'Behandelactiviteittypes',
          name: "Behandelactiviteittype",
          selectBoxOptions: inject(BehandelactiviteittypeSelectBoxOptionService).getObservableSelectBoxOptions()
        },
      ]
    }, statustypes: {
      title: 'Statustypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Statustypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('statustypes')
        },
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Statustypes', name: 'Omschrijving'},
        {fieldType: 'Text', inputType: 'number', required: true, type: 'Statustypes', name: "Volgnummer"},
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Statustypen', name: 'Informeren',
          selectBoxOptions: inject(BooleanSelectBoxOptionsService).getObservableSelectBoxOptions()
        },
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Statustypes', name: 'Statustekst'}
      ]
    }, roltypes: {
      title: 'Roltypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Roltypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('roltypes')
        },
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Roltypes', name: 'Omschrijving'},
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Roltypes', name: 'Betrokkene',
          selectBoxOptions: inject(BetrokkeneTypeSelectBoxOptionsService).getObservableSelectBoxOptions()
        }
      ]
    }, informatieobjecttypes: {
      title: 'Informatieobjecttypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Documentsoorttypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('documentsoorttypes')
        },
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Documentsoorttypes', name: 'Omschrijving'},
        {fieldType: 'Text', inputType: 'number', required: true, type: 'Documentsoorttypes', name: "Volgnummer"},
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Documentsoorttypes', name: 'Richting',
          selectBoxOptions: inject(RichtingSelectBoxOptionsService).getObservableSelectBoxOptions()
        }
      ]
    }, resultaattypes: {
      title: 'Resultaattypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Resultaattypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('resultaattypes')
        },
      ]
    }, beschikkingtypes: {
      title: 'Beschikkingtypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Beschikkingtypes', name: "ReferentieType",
          selectBoxOptions: inject(ReferentielijstenSelectBoxOptionsService).getObservableSelectBoxOptions('beschikkingtypes')
        },
      ]
    }, 'bijzondere-bepalingen': {
      title: 'Bijzondere bepalingen', deleteEndpointTitle: '', fields: [
        {
          fieldType: "SelectBox", inputType: 'text', required: true, type: '', name: "Type met reden",
          selectBoxOptions: inject(BijzondereBepalingTypeSelectBoxOptionsService).getObservableSelectBoxOptions()
        },
      ]
    }, "gerelateerde-zaaktypes": {
      title: 'Gerelateerde zaaktypes', deleteEndpointTitle: '', fields: [
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Zaaktypes', name: "Zaaktype",
          selectBoxOptions: inject(ZaaktypeSelectBoxOptionsService).getObservableSelectBoxOptions()
        },
        {
          fieldType: 'SelectBox', inputType: 'text', required: true, type: 'Zaaktypes', name: 'Aard relatie',
          selectBoxOptions: inject(AardRelatieSelectBoxOptionsService).getObservableSelectBoxOptions()
        },
        {fieldType: 'Text', inputType: 'text', required: true, type: 'Zaaktypes', name: "Toelichting"}
      ]
    }
  }

  protected links: { [key: string]: Links } = {
    behandelactiviteittypes: new Links(
      {format: '/behandelactiviteittypes/{:?}', keys: ['code']},
      {format: '/behandelactiviteittype-concepten/{:?}/overzicht', keys: ['code']},
      {format: '/behandelactiviteittype-vaststellen/{:?}', keys: ['code']}
    )
  };

  private selectedReferentieZaaktypeUUID: string | null = null;

  constructor(private zaaktypeConceptService: ZaaktypeConceptService) {
    super()
  }

  setCodeAfterReloadFor(route: ActivatedRoute) {
    return of(route.pathFromRoot[1].paramMap.subscribe((params) => {
      this.typeCode = params.get('code') ?? 'nieuw';
      this.setCurrentZaaktypeModelFor(this.typeCode);
    }));
  }

  setZaaktypeAfterCreate() {
    this.type = this.zaaktypeConceptService.getZaaktype();
    this.typeCode = this.type.code;
  }

  getCode() {
    return this.typeCode;
  }

  private setCurrentZaaktypeModelFor(code: string) {
    if (this.type) {
      return;
    }

    this.zaaktypeConceptService.getZaaktypeConceptFor(code).then((zaaktype) => {
      this.type = zaaktype
      this.selectedReferentieZaaktypeUUID = ''
    })
  }

  getListOfObjects() {
    return this.zaaktypeConceptService.getConceptListForStep(this.stepTitle);
  }

  initialiseStep() {
    return this.zaaktypeConceptService.getObservableZaaktype().pipe(mergeMap(model => {
      this.initialiseStepModel();
      return of(model);
    }))
  }

  add(model: any, code: string) {
    model = this.transformModelIfNeeded(model)
    this.zaaktypeConceptService.add(model, this.stepTitle, code)
  }

  transformModelIfNeeded(model: any) {
    if (isBehandelactiviteittypeModel(model)) {
      model = model.code
    }
    return model
  }

  getCheckBoxOptions(name: string) {
    switch (name) {
      case "Statustypes":
        return this.zaaktypeConceptService.getConceptListForStep("statustypes").map((model: { [x: string]: any; }) => ({
          title: model["uuid"],
          value: model["omschrijving"]
        }));
      case "Roltypes":
        return this.zaaktypeConceptService.getConceptListForStep("roltypes").map((model: { [x: string]: any; }) => ({
          title: model["uuid"],
          value: model["omschrijving"]
        }));
      case "Resultaattypes":
        return this.zaaktypeConceptService.getConceptListForStep("resultaattypes").map((model: {
          [x: string]: any;
        }) => ({
          title: model["uuid"],
          value: model["omschrijving"]
        }));
      default:
        return []
    }
  }
}
