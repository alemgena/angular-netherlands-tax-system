import {ModalColumnData, ModalComponentData} from "../model/modal-component-data";
import {ActivatedRoute} from "@angular/router";
import {AanleidingtypeModel} from "../model/aanleidingtype.model";
import {StatustypeModel} from "../model/statustype.model";
import {RoltypeModel} from "../model/roltype.model";
import {InformatieobjecttypeModel} from "../model/informatieobjecttype.model";
import {ResultaatModel} from "../model/resultaat.model";
import {BeschikkingtypeModel} from "../model/beschikkingtype.model";
import {BijzondereBepalingtypeModel} from "../model/bijzondereBepalingtype.model";
import {BehandelactiviteittypeModel} from "../model/behandelactiviteittype.model";
import {GerelateerdezaaktypeModel} from "../model/gerelateerdezaaktype.model";
import {ConceptBaseModel} from "../model/concept-base.model";
import {Observable, Subscription} from "rxjs";
import {BehandelactiviteittypeeigenschapModel} from "../model/behandelactiviteittypeeigenschap";
import {Links} from "../model/columndata.model";

export abstract class BaseStepService<T extends ConceptBaseModel> {
  protected type: T | undefined;
  protected stepTitle: string = "";
  protected displayTitle: string = "";
  protected typeCode: string = "";
  protected model: any | null = null;
  protected modelKeys: string[] = []
  protected abstract columns: {[key: string]: ModalColumnData};
  protected abstract links: {[key: string]: Links};
  protected abstract modalData: {[key: string]: ModalComponentData};
  abstract initialiseStep(): Observable<T>;
  abstract add(model: any, params: any): void;
  abstract setCodeAfterReloadFor(route: ActivatedRoute): Observable<Subscription>;
  abstract getListOfObjects(): any;

  getColumnsForStep(stepTitle: string = this.stepTitle) {
    if (stepTitle) {
      return this.columns[stepTitle].fields;
    }

    return [];
  }

  getFieldsForStep() {
    if (this.stepTitle) {
      return this.modalData[this.stepTitle].fields.filter(field => field.name !== 'Code');
    }

    return [];
  }

  getLinksForStep(stepTitle: string = this.stepTitle) : Links | null {
    if (stepTitle) {
      return this.links[stepTitle]
    }
    return null;
  }

  protected initialiseStepModel() {
    switch (this.stepTitle) {
      case 'aanleidingtypes':
        const aanleidingModel: AanleidingtypeModel = {referentietypeItemUuid: "", omschrijving: ""};
        this.model = aanleidingModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'statustypes':
        const statusModel: StatustypeModel = {referentietypeItemUuid: "", omschrijving: "", volgnummer: 0, informeren: true, statustekst: ""};
        this.model = statusModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'roltypes':
        const rolModel: RoltypeModel = {referentietypeItemUuid: "", omschrijving: "", betrokkene: ""};
        this.model = rolModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'informatieobjecttypes':
        const informatieobjectModel: InformatieobjecttypeModel = {referentietypeItemUuid: "", omschrijving: "", volgnummer: 0, richting: ""};
        this.model = informatieobjectModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'resultaattypes':
        const resultaatModel: ResultaatModel = {referentietypeItemUuid: "", omschrijving: ""};
        this.model = resultaatModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'beschikkingtypes':
        const beschikkingModel: BeschikkingtypeModel = {referentietypeItemUuid: "", omschrijving: ""};
        this.model = beschikkingModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'bijzondere-bepalingen':
        // Only uuid is used in POST, the other properties are ignored.
        const bijzondereBepalingModel: BijzondereBepalingtypeModel = {uuid: "", aantal: "", eersteTermijn: 0, opvolgendeTermijn: 0, reden: "", type: ""};
        this.model = bijzondereBepalingModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'behandelactiviteittypes':
        const behandelactiviteitModel: BehandelactiviteittypeModel = {code: "", referentielijstomschrijving :"", referentietypeItemUuid: "", roltypes: [], statustypes: [], resultaattypes: [], eigenschappen: [], omschrijving: "", toelichting: ""};
        this.model = behandelactiviteitModel;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'gerelateerde-zaaktypes':
        const gerelateerdeZaaktypes: GerelateerdezaaktypeModel = {zaaktype: "", aardRelatie: "", toelichting: ""};
        this.model = gerelateerdeZaaktypes;
        this.modelKeys = Object.keys(this.model)
        break;
      case 'eigenschappen':
        const behandelactiviteittypeeigenschap: BehandelactiviteittypeeigenschapModel = {eigenschap: "",  toelichting: "", behandelactiviteittype: ""};
        this.model = behandelactiviteittypeeigenschap;
        this.modelKeys = Object.keys(this.model)
        break;
      default:
        this.model = {};
        break;
    }
  }

  setTypeCode(code: string) {
    this.typeCode = code
  }

  setStepTitle(routeTitle: string) {
    this.stepTitle = routeTitle
  }

  setDisplayTitle(label: string) {
    this.displayTitle = label;
  }

  getDisplayTitle() {
    return this.modalData[this.stepTitle]?.title;
  }

  getDeleteTitle() {
    return this.modalData[this.stepTitle].deleteEndpointTitle;
  }

  getModel() {
    return this.model;
  }

  getModelKeys() {
    return this.modelKeys;
  }

  setType(type: T): void {
    this.type = type;
  }
}
