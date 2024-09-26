import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FieldDataModel} from "../../../../../model/fielddata.model";
import {FieldEventDataModel} from "../../../../../model/fieldeventdata.model";
import {formatInputId} from "../../../../../service/utils";

@Component({
  selector: 'app-text-field-input',
  templateUrl: './text-field-input.component.html',
  styleUrls: ['./text-field-input.component.css']
})
export class TextFieldInputComponent {
  protected readonly formatInputId = formatInputId;

  @Input() field!: FieldDataModel;
  @Input() propertyName!: string;
  @Input() value!: string
  @Output() valueChange = new EventEmitter<FieldEventDataModel>();

  updateParent(newValue: string) {
    this.valueChange.emit({newValue: newValue.trim(), propertyName: this.propertyName});
  }
}
