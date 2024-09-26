import {Component, Input, OnInit} from '@angular/core';
import {ColumnDataModel, Links} from "../../../../model/columndata.model";
import {AuthService} from "../../../../service/auth.service";
import {RoleGroupsModel} from "../../../../model/role-groups.model";

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {
  @Input() title: string | null = null;
  @Input() listOfObjects: any[] | null = null;
  @Input() columns: ColumnDataModel[] | null = null;
  @Input() numberOfColumns: string | null = null;
  @Input() links: Links | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.links && this.listOfObjects) {
      for (const obj of this.listOfObjects) {
        obj.routerLink = this.links.getRouterLink(obj, this.authService.hasGroup(RoleGroupsModel.INRICHTER), this.authService.hasGroup(RoleGroupsModel.VASTSTELLER));
      }
    }
  }

  isConcept(): boolean {
    return !!this.listOfObjects && this.listOfObjects?.some(item => item.versiedatum == null)
  }
}
