import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {BehandelactiviteittypeTableConceptDataComponent} from './behandelactiviteittype-table-concept-data.component';
import { BehandelactiviteittypeConceptService } from '../../../../service/behandelactiviteittype-concept.service';
import { of } from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BaseStepService} from "../../../../service/base-step.service";
import {ConceptBaseModel} from "../../../../model/concept-base.model";
import {
  BehandelactiviteittypeConceptStepService
} from "../../../../service/behandelactiviteittype-concept-step.service";

describe('TableConceptDataComponent', () => {
  let component: BehandelactiviteittypeTableConceptDataComponent
  let fixture: ComponentFixture<BehandelactiviteittypeTableConceptDataComponent>;
  let httpTestingController: HttpTestingController;
  let concept: BehandelactiviteittypeConceptStepService;
  let behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService;
  let stepService: BaseStepService<ConceptBaseModel>
  const list = [
    { uuid: '1234', referentietypeItemUuid: '1', omschrijving: 'test 1', betrokkene: 'test' },
    { uuid: '123', referentietypeItemUuid: '2', omschrijving: 'test 2', betrokkene: 'test' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BehandelactiviteittypeTableConceptDataComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BehandelactiviteittypeConceptService,BehandelactiviteittypeConceptStepService,BaseStepService<ConceptBaseModel>],
    }).compileComponents();

    fixture = TestBed.createComponent(BehandelactiviteittypeTableConceptDataComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    behandelactiviteittypeConceptService= TestBed.inject(BehandelactiviteittypeConceptService);
    stepService =TestBed.inject(BaseStepService<ConceptBaseModel>)
    concept = TestBed.inject(BehandelactiviteittypeConceptStepService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove object and show the remaining list if Removed button is click', () => {
    component.selectedModelUuid = '1234';
    component.title = 'Roltypes';
    // @ts-ignore
    spyOn(stepService, 'getDisplayTitle').and.returnValue('Statustypes');
    spyOn(concept, 'getListOfObjects').and.returnValue(list);

    const filteredList = component.getListOfObjects()
    component.deleteConcept("Roltypes", '1234')
    fixture.detectChanges()
    expect(filteredList.length).toBe(1);
    expect(filteredList[0].uuid).toBe('123');
    expect(component.title).toBe("Roltypes")
  });

  it('should call service method and set isRemoved to true',fakeAsync(() => {
    component.selectedModelUuid = '1234'
    component.title = 'Roltypes';
    // @ts-ignore
    spyOn(behandelactiviteittypeConceptService, 'deleteBehandelactiviteittypeConcept').and.returnValue(of({}));
    // @ts-ignore
    spyOn(concept, 'getDeleteTitle').and.returnValue('Roltypes');
    // @ts-ignore
    spyOn(concept, 'getListOfObjects').and.returnValue(list);

    component.getListOfObjects()
    component.onConfirm();
    component.deleteConcept("Roltypes", '1234')

    fixture.detectChanges()
    tick()
    flushMicrotasks()

    expect(behandelactiviteittypeConceptService.deleteBehandelactiviteittypeConcept).toHaveBeenCalledWith('Roltypes', '1234');
    expect(component.deleteModalOpen).toBe(false)
    }));
  });
