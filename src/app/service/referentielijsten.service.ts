import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {
  ReferentielijstItemModel,
  ReferentielijstModel,
  ResultatenModel
} from "../model/zaaktype/zaaktype-referentie.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReferentielijstenService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getReferentielijstItemsForName(name: string): Observable<ResultatenModel<ReferentielijstItemModel>> {
    return this.http.get<ResultatenModel<ReferentielijstItemModel>>(
      this.configService.apiConfiguration.baseUrl + `/referentielijsten/${name.toLowerCase()}`);
  }

  getReferentielijst(): Observable<ResultatenModel<ReferentielijstModel>> {
    return this.http.get<ResultatenModel<ReferentielijstModel>>(
      this.configService.apiConfiguration.baseUrl + `/referentielijsten/`);
  }

  getReferentieLijstItemForUuid(name: string, item_uuid: string): Observable<ReferentielijstItemModel>{
    return this.getReferentielijstItemsForName(name)
      .pipe(
        map(resultatenModel => resultatenModel.resultaten.find(item => item.uuid == item_uuid)!)
    );
  }
}
