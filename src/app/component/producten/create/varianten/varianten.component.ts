import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../../../service/producten.service";
import {ProductenModel} from "../../../../model/producten.model";
import {VariantModel} from "../../../../model/variant.model";
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-variants',
  templateUrl: './varianten.component.html',
  styleUrl: './varianten.component.css'
})
export class VariantenComponent implements OnInit{
  product: ProductenModel | null = null;
  reset = new BehaviorSubject(true);
  modalStates: boolean[] = [false];
  constructor(
    protected route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {}

  showModal() {
    this.reset.next(false);
    setTimeout(() => {
      this.reset.next(true);
    }, 1)

    this.modalStates = [true];
  }
  ngOnInit(): void {
    this.getVarianten();
  }

  getVarianten() {
    this.productService.setUuidAfterReloadFor(this.route)
    let code: string | null = this.productService.getUuid();
    code = code == "nieuw" ? null : code;
    this.productService.getProduct(code)
      .then(result => {
        this.product = result;
      })
  }

  updateVarianten(newVariant: VariantModel) {
      if(this.productService.tempProduct) {
        this.productService.tempProduct?.varianten.push(newVariant)
      }
      else {
        this.product?.varianten.push(newVariant);
      }
  }
}
