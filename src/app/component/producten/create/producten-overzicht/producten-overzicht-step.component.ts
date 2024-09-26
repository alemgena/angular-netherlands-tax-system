import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../service/producten.service";
import {ActivatedRoute} from "@angular/router";
import {ProductenModel} from "../../../../model/producten.model";

@Component({
  selector: 'app-producten-overzicht-step',
  templateUrl: './producten-overzicht-step.component.html',
  styleUrl: './producten-overzicht-step.component.css'
})
export class ProductenOverzichtStepComponent implements  OnInit{
  product: ProductenModel | null = null
  loading: boolean = false;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productService.setUuidAfterReloadFor(this.route)
    let uuid: string | null = this.productService.getUuid();
    uuid = uuid == "nieuw" ? null : uuid;
    this.productService.getProduct(uuid)
      .then(result => {
        this.product = result;
      })
  }
}
