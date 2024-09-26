import {Routes} from "@angular/router";
import {AuthGuard} from "../../app/authentication/auth.guard";
import {RoleGroupsModel} from "../../app/model/role-groups.model";
import {
  ProductionDetailsComponent
} from "../../app/component/producten/create/producten-details/production-details.component";
import {VariantenComponent} from "../../app/component/producten/create/varianten/varianten.component";
import {
  ProductenOverzichtStepComponent
} from "../../app/component/producten/create/producten-overzicht/producten-overzicht-step.component";

export const PRODUCTEN_ROUTES: Routes = [
  {
    path: 'details',
    component: ProductionDetailsComponent,
    title: 'CATALOGUS - Nieuw Product - details',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'varianten',
    component: VariantenComponent,
    title: 'CATALOGUS - Nieuw Product - variant',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER,RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'overzicht',
    component: ProductenOverzichtStepComponent,
    title: 'CATALOGUS - Nieuw Product - overzicht',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER,RoleGroupsModel.VASTSTELLER] }
  }
]
