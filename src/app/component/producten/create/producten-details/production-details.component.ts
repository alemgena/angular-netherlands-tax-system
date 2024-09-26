import {Component, NgZone, OnInit} from '@angular/core';
import {ProductenModel} from "../../../../model/producten.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../service/producten.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateConvertService} from "../../../../service/date-convert-service";

@Component({
  selector: 'app-producten-details',
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.css'
})
export class ProductionDetailsComponent implements OnInit{

  product: ProductenModel | null = null;
  productForm!: FormGroup
  constructor(
  protected route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private productService: ProductService,
  private dateConvertService: DateConvertService,
  private ngZone: NgZone,
  private router: Router,
  ) {}

  save() {
      this.ngZone.runOutsideAngular(() => {
        const waitForChangesPromise = new Promise<void>((resolve) => {
          setTimeout(() => {

            resolve();
          }, 0);
        });

        waitForChangesPromise.then(async () => {
          let pro = await this.productService.saveProduct(<ProductenModel>this.product)
          if (pro) {
            await this.router.navigateByUrl('producten/' + pro.uuid + '/varianten')
          }
        });
      });

  }

  ngOnInit(): void {
    this.initForm()
    this.productService.setUuidAfterReloadFor(this.route)
    let uuid: string | null = this.productService.getUuid();
    uuid = uuid == "nieuw" ? null : uuid;
    this.productService.getProduct(uuid)
        .then(result => {
          this.product = result;
        })
  }

  initForm(): void {
    this.productForm = this.formBuilder.group({
      naam: [this.product?.naam, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      code: [this.product?.code, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      omschrijving: [this.product?.omschrijving, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      toelichting: [this.product?.toelichting, [ Validators.maxLength(100)]],
      beoogdResultaat: [this.product?.beoogdResultaat, [Validators.maxLength(255)]],
      einddatumGeldigheid: [this.product?.einddatumGeldigheid],
      wijzigingsdatum: [this.product?.wijzigingsdatum]
    });
  }

  getUuid() {
    return this.productService.getUuid();
  }
  onChange(event: any, input: string) {
    if ( this.product?.wijzigingsdatum && input == "wijzigingsdatum") {
      this.product.wijzigingsdatum = this.dateConvertService.convertDate(event.detail)
    }
    if ( this.product?.einddatumGeldigheid && input == "einddatumGeldigheid") {
      this.product.einddatumGeldigheid = this.dateConvertService.convertDate(event.detail)
    }
  }
}
