import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { BaseStepService } from "../../../service/base-step.service";
import { ColumnDataModel } from "../../../model/columndata.model";
import { ConceptBaseModel } from "../../../model/concept-base.model";
import { BehandelactiviteittypeConceptService } from "../../../service/behandelactiviteittype-concept.service";

export abstract class TableConceptDataComponent {
  reset = new BehaviorSubject(true);
  title: string | undefined = "";
  columns: ColumnDataModel[] = [];
  numberOfColumns: string | null = null;
  modalStates: boolean[] = [false];
  initialized: boolean = false;
  deleteModalOpen: boolean = false;
  selectedModelUuid: string | null = null;
  checkRoute: boolean = false;
  models: any[] = [];
  protected stepName!: string;

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected stepService: BaseStepService<ConceptBaseModel>,
    protected behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService
  ) {
    this.finishInitialization()
  }

  finishInitialization() {
    const url = this.route.snapshot.url;
    this.stepName = url.length > 0 ? url[url.length - 1].path : '';
    this.checkRoute = this.router.url.includes("behandelactiviteittype-concepten")
    this.stepService.setCodeAfterReloadFor(this.route);
    this.stepService.setStepTitle(this.stepName);

    this.title = this.stepService.getDisplayTitle();
    this.columns = this.stepService.getColumnsForStep();
    let columnsLength = this.columns.length == 1 ? 2 : this.columns.length;
    this.numberOfColumns = "column-" + columnsLength + "-width";
    this.initialized = true
    this.models = this.stepService.getListOfObjects();
  }

  showModal() {
    // Recreate the modal component because we need to reset the form values to default.
    this.reset.next(false);
    setTimeout(() => {
      this.reset.next(true);
    }, 1)

    this.modalStates = [true];
  }

  openModal(uuid: any) {
    this.deleteModalOpen = true;
    this.selectedModelUuid = uuid;
  }

  onClose() {
    this.deleteModalOpen = false
  }

  getListOfObjects() {
    this.models = this.stepService.getListOfObjects();

    return this.models;
  }

  onConfirm() {
    this.behandelactiviteittypeConceptService.deleteBehandelactiviteittypeConcept(this.stepService.getDeleteTitle(), this.selectedModelUuid)
      .subscribe(() => {
        this.deleteConcept(this.stepName, this.selectedModelUuid)
      });
    this.onClose();
  }

  deleteConcept(title: string, uuid: string | null) {
    const indexToRemove = this.models.findIndex((item: any) => item.uuid === uuid);
    if (indexToRemove !== -1) {
      // Remove the object from the list
      this.models.splice(indexToRemove, 1);
    }
  }
}
