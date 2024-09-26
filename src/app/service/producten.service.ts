import { Injectable } from '@angular/core';
import {ProductenModel} from "../model/producten.model";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom, mergeMap, of} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productenUrl: string;
  uuid: null | string = "";
  tempProduct: ProductenModel | null = null

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.productenUrl = this.configService.apiConfiguration.baseUrl + "/producten"
  }

   async saveProduct(product: ProductenModel) {
    return await firstValueFrom(this.http.post<ProductenModel>(
      this.productenUrl,
      product
    ).pipe(mergeMap(res => {
       this.tempProduct = res
       return of(res)
     })))
  }

  getAllProducten() {
    return this.http.get<ProductenModel[]>(
      this.productenUrl);
  }
  async getProduct(uuid: string | null) {
    if (uuid) {
      return await this.getExistingProduct(uuid);
    } else {
      return await this.getNewProduct();
    }
  }
  private async getExistingProduct(uuid: string) {
    if (this.tempProduct) return this.tempProduct
    return await firstValueFrom(this.http.get<ProductenModel>(
      this.productenUrl + '/' + uuid) .pipe(mergeMap(res => {
      this.tempProduct = res
      return of(res)
    })));
  }

  private async getNewProduct() {
    return Promise.resolve({
      naam: "",
      code: "",
      einddatumGeldigheid: "",
      beoogdResultaat: "",
      begindatumGeldigheid: "",
      wijzigingsdatum: "",
      omschrijving: "",
      varianten: [],
      toelichting: ""
    } as ProductenModel);
  }

  setUuidAfterReloadFor(route: ActivatedRoute) {
    return of(route.pathFromRoot[1]?.paramMap.subscribe((params) => {
      this.uuid = params.get('uuid') ?? 'nieuw';
    }));
  }
  getUuid() {
    return this.uuid;
  }

  async  patchProduct(uuid:any): Promise<ProductenModel | undefined> {
    try {
      const patchedType: ProductenModel = await firstValueFrom(this.http.patch<ProductenModel>(
        this.productenUrl + '/' + uuid,
        this.tempProduct
      ))
      this.tempProduct = patchedType
      return patchedType
    } catch (err) {
      console.error(err)
    }
  }
}
