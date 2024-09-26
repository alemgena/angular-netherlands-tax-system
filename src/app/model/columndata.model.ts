import {AuthService} from "../service/auth.service";
import {RoleGroupsModel} from "./role-groups.model";

export interface ColumnDataModel {
  key: string;
  name: string;
}

/**
 * The length of the keys array should match the quantity of replaces in the format string.
 *
 * Replaces should be formatted as {:?}
 *
 * @see parseLinkObjects
 */
export interface Link {
  format: string;
  keys: string[];
}

export class Links {
  detailsLink: Link;
  inrichterLink: Link;
  vaststellerLink: Link;

  constructor(detailsLink: Link, inrichterLink: Link, vaststellerLink: Link) {
    this.detailsLink = detailsLink;
    this.inrichterLink = inrichterLink;
    this.vaststellerLink = vaststellerLink;
  }

  /**
   * Parses the given link using the data in the list of objects.
   *
   * Example:
   *   format: "types/{:?}/test
   *   keys: ["code"]
   *
   * The code will be fetched from the given data by using code as a key of the object.
   *
   * @param object
   * @param isInrichter
   * @param isVaststeller
   */
  getRouterLink(object: any, isInrichter: boolean, isVaststeller: boolean): String | null {
    let link = this.getLink(!object.versiedatum, isInrichter, isVaststeller);
    if (link == null) return null;
    const args = (JSON.parse(JSON.stringify(link.keys)) as string[]).reverse()
    return link.format.replace(/{(:\?)}/g, () => {
      return object[args.pop() ?? ""]
    });
  }

  // Only inrichters or vaststellers will have a link to edit/complete concepten.
  private getLink(isConcept: boolean, isInrichter: boolean, isVaststeller: boolean) {
    if (!isConcept){
      return this.detailsLink;
    }

    if (isInrichter) return this.inrichterLink;
    if (isVaststeller) return this.vaststellerLink;

    return null;
  }
}

