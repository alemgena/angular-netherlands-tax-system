import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VariantModel} from "../../../../model/variant.model";
import {VariantService} from "../../../../service/variant.service";
import {DateConvertService} from "../../../../service/date-convert-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductenModel} from "../../../../model/producten.model";

@Component({
  selector: 'app-variant-add-modal',
  templateUrl: './variant-add-modal.component.html',
})
export class VariantAddModalComponent implements OnInit{
  code: string | null = null;
  variant: VariantModel | null = null
  @Input() state: boolean[] = [false];
  @Input() product: ProductenModel | null = null
  @Output() updateVarianten = new EventEmitter<VariantModel>();

  variantForm!: FormGroup;
  constructor(private variantService: VariantService,
              private dateConvertService: DateConvertService,
              private formBuilder: FormBuilder,
              protected route: ActivatedRoute
  ) {
  }

  getNewVariant() {
    this.variantService.getNewVariant()
      .then(result => {
        this.variant = result;
      })
  }

  onConfirm() {
    this.variantService.saveVariant(<VariantModel>this.variant, this.product?.code).then((variant) => {
      if (variant) {
        this.updateVarianten.emit(variant);
        this.getNewVariant();
        this.onClose();
      }
      }
    )

  }

  onClose() {
    this.state = [false];
  }

  ngOnInit(): void {
    this.getNewVariant()
    this.initForm();
  }

  onChange(event: any, input: string) {
    if ( this.variant?.wijzigingsdatum && input == "wijzigingsdatum") {
      this.variant.wijzigingsdatum = this.dateConvertService.convertDate(event.detail)
    }
    if ( this.variant?.einddatumGeldigheid && input == "einddatumGeldigheid") {
      this.variant.einddatumGeldigheid = this.dateConvertService.convertDate(event.detail)
    }
  }

  initForm(): void {
    this.variantForm = this.formBuilder.group({
      naam: [this.variant?.naam, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      code: [this.variant?.code, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      omschrijving: [this.variant?.omschrijving, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      grondslag: [this.variant?.grondslag, [Validators.maxLength(255)]],
      einddatumGeldigheid: [this.variant?.einddatumGeldigheid],
      wijzigingsdatum: [this.variant?.wijzigingsdatum],
      serviceTermijn: [this.variant?.serviceTermijn, [Validators.min(1), Validators.max(999)]],
      wettelijkeTermijn: [this.variant?.wettelijkeTermijn, [Validators.min(1), Validators.max(999)]],
    });
  }
}
