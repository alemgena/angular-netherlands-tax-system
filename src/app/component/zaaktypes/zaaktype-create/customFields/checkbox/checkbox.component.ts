import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FieldDataModel} from "../../../../../model/fielddata.model";
import {ZaaktypeConceptStepService} from "../../../../../service/zaaktype-concept-step.service";
import {FieldEventDataModel} from "../../../../../model/fieldeventdata.model";
import {formatInputId} from "../../../../../service/utils";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  protected readonly formatInputId = formatInputId;

  @Input() value!: string;
  @Input() propertyName!: string;
  @Input() field!: FieldDataModel;
  @Output() valueChange = new EventEmitter<FieldEventDataModel>();

  constructor(private stepService: ZaaktypeConceptStepService) {}

  checkboxOptions: any = []
  ngOnInit(){
    this.checkboxOptions = this.stepService.getCheckBoxOptions(this.field.name)
  }

  onCheckChange(newValue: any) {
    this.valueChange.emit({newValue: newValue.detail, propertyName: this.propertyName})
  }
}
