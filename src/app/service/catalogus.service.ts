import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {ZaaktypeOmschrijvingModel} from "../model/zaaktype/zaaktype-omschrijving.model";
import {ZaaktypeModel} from "../model/zaaktype/zaaktype.model";
import {ZaaktypePagedresponseModel} from "../model/zaaktypepagedresponse.model";
import {BehandelactiviteittypepagedModel} from "../model/behandelactiviteittypepaged.model";
import {BehandelactiviteittypeModel} from "../model/behandelactiviteittype.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogusService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getZaaktypesPaged(page: number) {
    return this.http.get<ZaaktypePagedresponseModel>(this.configService.apiConfiguration.baseUrl + '/zaaktypes?page=' + page);
  }
  getZaaktypesPagedsize(page: number, size: number) {
    return this.http.get<ZaaktypePagedresponseModel>(this.configService.apiConfiguration.baseUrl + '/zaaktypes?page=' + page+'&size=' + size);
  }

  getZaaktypeOmschrijvingen() {
    return this.http.get<ZaaktypeOmschrijvingModel[]>(this.configService.apiConfiguration.baseUrl + '/zaaktypes/omschrijving');
  }

  getZaaktype(code: string) {
    return this.http.get<ZaaktypeModel>(this.configService.apiConfiguration.baseUrl + '/zaaktypes/' + code);
  }
  getZaaktypeConceptenPaged(page: number) {
    return this.http.get<ZaaktypePagedresponseModel>(this.configService.apiConfiguration.baseUrl + '/zaaktypeconcepten?page=' + page);
  }

  getZaaktypeConcept(code: string) {
    return this.http.get<ZaaktypeModel>(this.configService.apiConfiguration.baseUrl + '/zaaktypeconcepten/' + code);
  }

  getBehandelactiviteittypesPaged(page: number) {
    return this.http.get<BehandelactiviteittypepagedModel>(this.configService.apiConfiguration.baseUrl
      + '/behandelactiviteittypes?page=' + page);
  }

  getBehandelactiviteittypes() {
    return this.http.get<BehandelactiviteittypeModel[]>(this.configService.apiConfiguration.baseUrl
      + '/behandelactiviteittypes/filtered');
  }

  getBehandelactiviteittype(code: string) {
    return this.http.get<BehandelactiviteittypeModel>(this.configService.apiConfiguration.baseUrl
      + '/behandelactiviteittypes/' + code);
  }

  getBehandelactiviteittypeConceptenPaged(page: number) {
    return this.http.get<BehandelactiviteittypepagedModel>(this.configService.apiConfiguration.baseUrl
      + '/behandelactiviteittypeconcepten?page=' + page);
  }

  finializeZaaktypeConcept(code: string) {
    return this.http.post(this.configService.apiConfiguration.baseUrl + '/zaaktypeconcepten/' + code + '/vaststellen', {});
  }
}
