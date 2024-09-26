import {Links, Page} from "./pagination.model";
import {ProductenModel} from "./producten.model";

export interface ProductenpagedresponseModel {
  page: Page
  _embedded: {'productenDTOList': ProductenModel[]}
  _links: Links
}
