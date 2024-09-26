import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {CatalogusService} from "./catalogus.service";
import {firstValueFrom} from "rxjs";
import {EigenschapPagedresponseModel} from "../model/eigenschappagedresponse.model";
import {EigenschapModel} from "../model/eigenschap.model";

@Injectable({
  providedIn: 'root'
})
export class EigenschappenService {
  private readonly eigenschappenUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService, private catalogusService: CatalogusService) {
    this.eigenschappenUrl = this.configService.apiConfiguration.baseUrl + "/eigenschappen"
  }

  async getEigenschap(uuid: String | null) {
    if (uuid) {
      return await this.getExistingEigenschap(uuid);
    } else {
      return await this.getNewEigenschap();
    }
  }

  getEigenschappenPaged(page: number) {
    return this.http.get<EigenschapPagedresponseModel>(
      this.eigenschappenUrl + "/pageable?page=" + page);
  }

  getAllEigenschappen() {
    return this.http.get<EigenschapModel[]>(
      this.eigenschappenUrl);
  }

  async saveEigenschap(eigenschap: EigenschapModel) {
    try {
      if (eigenschap.uuid) {
        return await this.saveExistingEigenschap(eigenschap);
      } else {
        return await this.saveNewEigenschap(eigenschap);
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async getNewEigenschap() {
    return Promise.resolve({
      naam: "",
      definitie: "",
      formaat: "",
      lengte: 0,
      kardinaliteit: 0,
      waardenverzameling: [],
      toelichting: "",
    } as EigenschapModel);
  }

  private async getExistingEigenschap(uuid: String) {
    return await firstValueFrom(this.http.get<EigenschapModel>(
      this.eigenschappenUrl + '/' + uuid));
  }

  private async saveNewEigenschap(eigenschap: EigenschapModel) {
    return await firstValueFrom(this.http.post<EigenschapModel>(
      this.eigenschappenUrl,
      eigenschap
    ))
  }

  private async saveExistingEigenschap(eigenschap: EigenschapModel) {
    const uuid = eigenschap.uuid
    // The DTO doesn't allow sending the UUID, so we copy and remove.
    const eigenschapCopy = JSON.parse(JSON.stringify(eigenschap)) as EigenschapModel
    delete  eigenschapCopy.uuid
    return await firstValueFrom(this.http.patch<EigenschapModel>(
      this.eigenschappenUrl + '/' + uuid,
      eigenschapCopy
    ))
  }
}
