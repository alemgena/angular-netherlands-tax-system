import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ReferentielijstenService} from "../../../service/referentielijsten.service";
import {FieldDataModel} from "../../../model/fielddata.model";
import {BetrokkeneType} from "../../../model/roltype.model";
import {FieldEventDataModel} from "../../../model/fieldeventdata.model";
import {SelectBoxComponent} from "../../zaaktypes/zaaktype-create/customFields/select-box/select-box.component";
import {BaseStepService} from "../../../service/base-step.service";
import {ConceptBaseModel} from "../../../model/concept-base.model";
import {BasetypeModel} from "../../../model/basetype.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table-concept-add-modal',
  templateUrl: './table-concept-add-modal.component.html',
  styleUrls: ['./table-concept-add-modal.component.css']
})
export class TableConceptAddModalComponent {
  @ViewChild(SelectBoxComponent, {static: false}) selectBoxComponent!: SelectBoxComponent;
  fields: FieldDataModel[] | null = null;
  model: any | null = null;
  modelKeys: string[] = []
  params: string | null = null

  @Input() stepService: BaseStepService<ConceptBaseModel> | undefined
  @Input() title: string | null = null;
  @Input() state: boolean[] = [false];
  type: BasetypeModel | null = null;

  @Output() updateObjects = new EventEmitter<string>;

  confirmHidden = true;
  constructor(private referentielijstenService: ReferentielijstenService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.stepService) {
      this.fields = this.stepService.getFieldsForStep();
      this.stepService.initialiseStep().subscribe(() => {
        if (this.stepService) {
          this.model = this.stepService.getModel()
          this.modelKeys = this.stepService.getModelKeys();
        }
      })
    }
  }

  validateForm() {
    let valid: boolean = true;

    this.fields?.forEach((field, index) => {
      if(field.name.includes("ReferentieType")) {
        if (field.required && (!this.model["referentietypeItemUuid"] || this.model["referentietypeItemUuid"].length === 0)) {
          valid = false;
        }
      }else if (field.required && this.model[this.modelKeys[index]].length === 0) {
        valid = false;
      }
    })

    this.confirmHidden = !valid;
  }

  onValueChange(data: FieldEventDataModel){
    this.updateModel(data.newValue, data.propertyName);
    switch(data.propertyName){
      case "referentietypeItemUuid":
        this.updateOmschrijvingByReferentieTypeUuid(data.field?.type!, data.newValue);
        break;
    }
    this.validateForm();
  }

  updateModel(newValue: string, propertyName: string) {
    this.model[propertyName] = newValue;
  }

  updateArrayModel(data: { newValue: string, propertyName: string }) {
    switch (data.propertyName) {
      case "resultaattypes":
        if(data.newValue === null){
          this.model.resultaattypes.pop()
        }else {
          this.model.resultaattypes.push({referentietypeItemUuid: data.newValue, omschrijving: ""})
        }
        break;
      case "statustypes":
        if (data.newValue === null) {
          this.model.statustypes.pop()
        }else {
          this.model.statustypes.push({referentietypeItemUuid: data.newValue, omschrijving: "", volgnummer: 0, informeren: true, statustekst: ""})
        }
        break;
      case "roltypes":
        if(data.newValue === null){
          this.model.roltypes.pop()
        }else {
          this.model.roltypes.push({referentietypeItemUuid: data.newValue, omschrijving: "", betrokkene: BetrokkeneType.BECON})
        }
        break;
      default:
        break;
    }
    this.validateForm()
  }

  updateOmschrijvingByReferentieTypeUuid(referentietypelijstName: string, referentietypeItemUuid: string) {
    this.referentielijstenService.getReferentieLijstItemForUuid(referentietypelijstName, referentietypeItemUuid).subscribe(referentietypeItem => {
      if (referentietypeItem) this.model["omschrijving"] = referentietypeItem.omschrijving;
    })
  }

  onClose() {
    this.state = [false];
  }

  onConfirm() {
    if (this.stepService) {
      this.route.pathFromRoot[1].paramMap.subscribe((params) => {
        this.params = params.get('code')
      });
        this.stepService.add(this.model, this.params)
    }
    this.updateObjects.emit(this.model);
    this.selectBoxComponent.getUpdatedOptions()

    this.onClose();
  }
}
