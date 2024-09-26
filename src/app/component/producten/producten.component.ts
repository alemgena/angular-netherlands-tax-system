import {Component, OnInit} from '@angular/core';
import {ProductenModel} from "../../model/producten.model";
import {ProductService} from "../../service/producten.service";
import {finalize} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {RoleGroupsModel} from "../../model/role-groups.model";

@Component({
  selector: 'app-producten',
  templateUrl: './producten.component.html',
})
export class ProductenComponent  implements OnInit{
  producten:ProductenModel[] = []
  loading: boolean = false
  protected readonly RoleGroupsModel = RoleGroupsModel;

  constructor(private productService: ProductService, protected authService: AuthService)
  {}

  ngOnInit(): void {
    this.fetchAllProducten()
    this.productService.tempProduct = null
  }

  fetchAllProducten(): void {
    this.loading = true;
    this.productService.getAllProducten()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(result => {
        this.producten = result;
      });
  }
}
