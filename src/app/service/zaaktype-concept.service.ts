import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {Initiatie, Vertrouwelijkheidaanduiding, ZaaktypeModel} from "../model/zaaktype/zaaktype.model";
import {firstValueFrom, mergeMap, Observable, of} from "rxjs";
import {TermijnMogelijkheidModel} from "../model/termijnMogelijkheid.model";
import {BeslistermijnentypeModel} from "../model/beslistermijnentype.model";
import {ConceptServiceBase} from "../component/concept-utils/concept-service-base";

@Injectable({
  providedIn: 'root'
})
export class ZaaktypeConceptService extends ConceptServiceBase<ZaaktypeModel> {
  private requestSent: boolean = false;

  constructor(protected http: HttpClient, protected configService: ConfigService) {
    super(http, configService, "zaaktypeconcepten", {
      "aanleidingtypes": "aanleidingtype",
      "behandelactiviteittypes": "behandelactiviteittype",
      "statustypes": "statustype",
      "informatieobjecttypes": "informatieobjecttype",
      "roltypes": "roltype",
      "resultaattypes": "resultaattype",
      "beschikkingtypes": "beschikkingtype",
      "gerelateerde-zaaktypes": "gerelateerdezaaktypes",
      "bijzondere-bepalingen": "bijzonderebepalingen"
    })
  }

  private getEmptyZaaktype() {
    return {
      omschrijving: "",
      omschrijvinggeneriek: "",
      referentietype: "",
      initiatie: Initiatie.EXTERN,
      beslistermijn: {
        doorlooptijd: 0,
        bijzondereBepalingen: [],
        mogelijkheden: {
          opschortingMogelijk: false,
          verdagingMogelijk: false,
          verlengingMogelijk: false
        } as TermijnMogelijkheidModel
      } as BeslistermijnentypeModel,
      vertrouwelijkheidAanduiding: Vertrouwelijkheidaanduiding.INTERN,
      begindatumGeldigheid: "",
      versiedatum: "",
      einddatumGeldigheid: ""
    } as unknown as ZaaktypeModel
  }

  /**
   * Example usage:
   * ```
   * this.zaaktypeConceptService.getZaaktypeConcept(code).then((zaaktype) => {
   *   this.zaaktype = zaaktype
   * })
   * ```
   *
   * @deprecated Set code first then Use getObservableZaaktype instead
   * @param code - A zaaktype concept code
   */
  async getZaaktypeConceptFor(code: string) {
    if (this.type !== null) {
      this.code = this.type?.code ?? "";
      return this.type
    }

    if (code === 'nieuw') {
      this.type = this.getEmptyZaaktype();
      return this.type;
    }

    try {
      if (this.requestSent) {
        return undefined
      }
      this.requestSent = true
      this.type = await firstValueFrom(this.http.get<ZaaktypeModel>(this.configService.apiConfiguration.baseUrl + `/zaaktypeconcepten/${code}`))
      this.requestSent = false
      return this.type
    } catch (err) {
      console.log(err)
    }
    return undefined
  }

  /**
   * If the zaaktype code is set before this function is called it will return, through an observable, either:
   *  - Return an empty zaaktype if the code was 'nieuw'
   *  - Return the fetched zaaktype
   *  - Return the stored zaaktype
   *
   * Note: If this is your first time using this service in the application it might have cache from the previous
   *       usage and shoud be cleared with the `clear` method.
   *
   *  @requires zaaktypeCode to be set
   *  @return Observable<ZaaktypeModel>
   */
  getObservableZaaktype(): Observable<ZaaktypeModel> {
    if (this.code === 'nieuw') {
      this.type = this.getEmptyZaaktype();
      return of(this.type);
    }
    if (!this.code) throw new Error("Zaaktype cannot be fetched before setting zaaktype code.")
    if (this.type) return of(this.type)
    return this.http.get<ZaaktypeModel>(this.configService.apiConfiguration.baseUrl
      + `/zaaktypeconcepten/${this.code}`).pipe(mergeMap(res => {
        this.type = res
        return of(res)
      }))
  }

  /**
   * Old method of fetching the zaaktype.
   *
   * @deprecated Set code first then Use getObservableZaaktype instead
   */
  getZaaktype(): ZaaktypeModel {
    return this.type ?? this.getEmptyZaaktype();
  }

  override getConceptListForStep(title: string) {
    if (this.type === undefined) {
      this.getZaaktypeConceptFor(this.code);
      return;
    }

    if(title.toLowerCase() == "bijzondere-bepalingen"){
      return this.type.beslistermijn.bijzondereBepalingen;
    }

    //We need to format stepTitle first to match with the zaaktype object key.
    return this.type[this.formatStepTitle(title.toLowerCase())] ?? [];
  }
}
