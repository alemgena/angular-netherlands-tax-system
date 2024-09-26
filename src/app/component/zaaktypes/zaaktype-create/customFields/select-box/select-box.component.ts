import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FieldDataModel} from "../../../../../model/fielddata.model";
import {SelectBoxOption} from "../../../../../model/selectbox/select-box-option.model";
import {FieldEventDataModel} from "../../../../../model/fieldeventdata.model";
import {Observable} from "rxjs";
import {formatInputId} from "../../../../../service/utils";

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent {
  protected readonly formatInputId = formatInputId;

  @Input() field!: FieldDataModel;
  @Input() propertyName!: string;
  @Input() value!: string;
  @Input() observableSelectBoxOptions!: Observable<SelectBoxOption[]>;
  selectBoxOptions: SelectBoxOption[] = [];
  @Output() valueChange = new EventEmitter<FieldEventDataModel>();

  ngOnInit(){
    this.getUpdatedOptions()
  }

  getUpdatedOptions() {
    this.observableSelectBoxOptions?.subscribe(selectBoxOptions =>
      this.selectBoxOptions = selectBoxOptions
    );
  }

  onUpdateValue() {
    this.valueChange.emit({newValue: this.value, propertyName: this.propertyName, field: this.field})
  }
}
