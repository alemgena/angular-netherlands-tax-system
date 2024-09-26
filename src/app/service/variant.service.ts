import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {firstValueFrom} from "rxjs";
import {VariantModel} from "../model/variant.model";

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  private readonly variantenUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.variantenUrl = this.configService.apiConfiguration.baseUrl + "/varianten"
  }

   async saveVariant(variant: VariantModel, code: string | null | undefined) {
    return await firstValueFrom(this.http.post<VariantModel>(
      this.variantenUrl + '?productCode=' + code,
      variant
    ))
  }

   async getNewVariant() {
    return Promise.resolve({
      naam: "",
      code: "",
      einddatumGeldigheid: "",
      serviceTermijn: 0,
      wettelijkeTermijn: 0,
      grondslag: "",
      begindatumGeldigheid: "",
      wijzigingsdatum: "",
      omschrijving: "",
      toelichting: ""
    } as VariantModel);
  }
}
