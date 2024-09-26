import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableDetailComponent} from './table-detail.component';
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TableDetailComponent', () => {
  let component: TableDetailComponent;
  let fixture: ComponentFixture<TableDetailComponent>;
  let behandelactiviteittypes;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDetailComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should concept warning be visible', () => {
    behandelactiviteittypes = [{"versiedatum": null}]
    component.title = "Behandelactiviteittypes"
    component.listOfObjects = behandelactiviteittypes;
    const result = component.isConcept();
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('bldc-notification[type="warning"]'))
    expect(result).toBe(true);
    expect(text).toBeTruthy()
  });

  it('should concept warning not be visible', () => {
    component.title = "Behandelactiviteittypes"
    behandelactiviteittypes = [{"versiedatum": "2023-09-11"}]
    component.listOfObjects = behandelactiviteittypes;
    const result = component.isConcept();
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('bldc-notification[type="warning"]'))
    expect(result).toBe(false);
    expect(text).toBeFalsy()
  });
});
