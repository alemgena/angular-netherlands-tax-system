import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AantalTermijnen, BijzondereBepalingtypeModel, TermijnType} from "../model/bijzondereBepalingtype.model";
import {firstValueFrom, map} from "rxjs";
import {CatalogusService} from "./catalogus.service";

@Injectable({
  providedIn: 'root'
})
export class BijzondereBepalingService {
  private readonly bijzondereBepalingenUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService, private catalogusService: CatalogusService) {
    this.bijzondereBepalingenUrl = this.configService.apiConfiguration.baseUrl + "/bijzonderebepalingen"
  }

  async getBijzondereBepaling(uuid: String | null) {
    if (uuid) {
      return await this.getExistingBijzondereBepaling(uuid);
    } else {
      return await this.getNewBijzondereBepaling();
    }
  }

  getBijzondereBepalingen() {
    return this.http.get<BijzondereBepalingtypeModel[]>(
      this.bijzondereBepalingenUrl);
  }

  getBijzondereBepalingenFiltered(zaaktypeconcept_code: string) {
    let queryParams = new HttpParams().append("zaaktypeconcept_code", zaaktypeconcept_code);

    return this.http.get<BijzondereBepalingtypeModel[]>(
      this.bijzondereBepalingenUrl + '/filtered',
      {params: queryParams});
  }

  async saveBijzondereBepaling(bijzondereBepaling: BijzondereBepalingtypeModel) {
    try {
      if (bijzondereBepaling.uuid) {
        return await this.saveExistingBijzondereBepaling(bijzondereBepaling);
      } else {
        return await this.saveNewBijzondereBepaling(bijzondereBepaling);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async getNewBijzondereBepaling() {
    const newBijzondereBepaling: BijzondereBepalingtypeModel = {
      aantal: "", eersteTermijn: 0, opvolgendeTermijn: 0, reden: "", type: "",
    }
    return Promise.resolve(newBijzondereBepaling);
  }

  private async getExistingBijzondereBepaling(uuid: String) {
    return await firstValueFrom(this.http.get<BijzondereBepalingtypeModel>(
      this.bijzondereBepalingenUrl + '/' + uuid));
  }

  private async saveNewBijzondereBepaling(bijzondereBepaling: BijzondereBepalingtypeModel) {
    return await firstValueFrom(this.http.post<BijzondereBepalingtypeModel>(
      this.bijzondereBepalingenUrl,
      bijzondereBepaling
    ))
  }

  private async saveExistingBijzondereBepaling(bijzondereBepaling: BijzondereBepalingtypeModel) {
    return await firstValueFrom(this.http.patch<BijzondereBepalingtypeModel>(
      this.bijzondereBepalingenUrl,
      bijzondereBepaling
    ))
  }
}
