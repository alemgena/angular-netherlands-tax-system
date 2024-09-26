import {ZaaktypeOmschrijvingModel} from "./zaaktype/zaaktype-omschrijving.model";
import {Links, Page} from "./pagination.model";

export interface ZaaktypePagedresponseModel {
  page: Page
  _embedded: {'zaaktypeomschrijvingen': ZaaktypeOmschrijvingModel[]}
  _links: Links
}
