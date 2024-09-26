import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {mergeMap, Observable, of} from "rxjs";
import {BehandelactiviteittypeModel} from "../model/behandelactiviteittype.model";
import {ConceptServiceBase} from "../component/concept-utils/concept-service-base";

@Injectable({
  providedIn: 'root'
})
export class BehandelactiviteittypeConceptService extends ConceptServiceBase<BehandelactiviteittypeModel> {

  constructor(protected http: HttpClient, protected configService: ConfigService) {
    super(http, configService, "behandelactiviteittypeconcepten", {
      "statustypes": "statustype",
      "roltypes": "roltype",
      "resultaattypes": "resultaattype",
      "eigenschappen": "eigenschappen"
    });
  }

  private getEmptyBehandelactiviteit() {
    return {
      referentietypeItemUuid: "",
      roltypes: [],
      statustypes: [],
      resultaattypes: [],
      eigenschappen: [],
      omschrijving: "",
      toelichting: "",
    } as unknown as BehandelactiviteittypeModel
  }

  /**
   * If the behandelactiviteittype code is set before this function is called it will return, through an observable, either:
   *  - Return an empty behandelactiviteittype if the code was 'nieuw'
   *  - Return the stored behandelactiviveittype
   *  - Return the fetched behandelactiviveittype
   *
   * Note: If this is your first time using this service in the application it might have cache from the previous
   *       usage and shoud be cleared with the `clear` method.
   *
   *  @requires behandelactiviteitCode to be set
   *  @return Observable<BehandelactiviteittypeModel>
   */
  getObservableBehandelactiviteit(): Observable<BehandelactiviteittypeModel> {
    if (this.code === 'nieuw') {
      this.type = this.getEmptyBehandelactiviteit();
      return of(this.type);
    }
    if (!this.code) throw new Error("Behandelactiviteittype cannot be fetched before setting behandelactiviteittypeCode code.")
    if (this.type) return of(this.type)
    return this.http
      .get<BehandelactiviteittypeModel>(this.url + `/behandelactiviteittypeconcepten/` + this.code)
      .pipe(mergeMap(res => {
        this.type = res
        return of(res)
      }))
  }

  finializeBehandelactiviteittypeConcept(code: string) {
    return this.http.post(this.url + '/behandelactiviteittypeconcepten/' + code + '/vaststellen', {});
  }

  deleteBehandelactiviteittypeConcept(deleteTitle: string, uuid: string |null) {
    return this.http.delete(this.url + '/behandelactiviteittypeconcepten/' + this.code + '/' + deleteTitle + '/' + uuid, {});
  }

}
