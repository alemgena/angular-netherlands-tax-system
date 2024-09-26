import {ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

import {BijzondereBepalingenDetailsComponent} from "./bijzondere-bepalingen-details.component";
import {BijzondereBepalingService} from "../../../service/bijzondere-bepaling.service";
import {AantalTermijnen, TermijnType} from "../../../model/bijzondereBepalingtype.model";
import {By} from "@angular/platform-browser";

describe('BijzondereBepalingenComponent', () => {
  let component: BijzondereBepalingenDetailsComponent
  let fixture: ComponentFixture<BijzondereBepalingenDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let bijzondereBepalingService: BijzondereBepalingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BijzondereBepalingenDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BijzondereBepalingService],
    }).compileComponents();

    fixture = TestBed.createComponent(BijzondereBepalingenDetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    bijzondereBepalingService = TestBed.inject(BijzondereBepalingService);
    // @ts-ignore
    component.bijzondereBepalingType = {
      uuid: "1",
      type: TermijnType.VERLENGING,
      reden: "reden",
      eersteTermijn: 1,
      opvolgendeTermijn: 1
    }
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should change the type value', fakeAsync(() => {
    // @ts-ignore
    fixture.detectChanges()
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('bldc-select-box[formControlName="type"]')).nativeElement;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let text = select.options[select.selectedIndex].label;
      expect(text).toBe('Verlenging')
    });
  }));

  it('should change the value of aantal', fakeAsync(() => {
    // @ts-ignore
    component.aantalTermijnenOptions = {
      title: "Een",
      value: AantalTermijnen.EEN
    }
    fixture.detectChanges()
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('bldc-select-box[formControlName="aantal"]')).nativeElement;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let text = select.options[select.selectedIndex].label;
      expect(text).toBe('Een')
    });
  }));

  it('should disable the button for an invalid input field', fakeAsync(() => {
    fixture.detectChanges();

    component.bijzondereBepalingenForm?.setValue({
      type: TermijnType.VERDAGING,
      reden: 'test',
      aantal: AantalTermijnen.TWEE,
      eersteTermijn: 15,
      opvolgendeTermijn: 8899
    })
    fixture.detectChanges()

    const buttonDebugElement = fixture.debugElement.query(By.css('bldc-button[elem-title="Bewaar"]'));
    const buttonNativeElement = buttonDebugElement.nativeElement;

    expect(buttonNativeElement.disabled).toBe(true);
    expect(component.bijzondereBepalingenForm?.valid).toBe(false)
  }));

  it('should not disable the button for an valid input field', fakeAsync(() => {
    component.bijzondereBepalingenForm?.setValue({
      type: TermijnType.VERDAGING,
      reden: 'test',
      aantal: AantalTermijnen.TWEE,
      eersteTermijn: 15,
      opvolgendeTermijn: 88
    })
    fixture.detectChanges()

    const buttonDebugElement = fixture.debugElement.query(By.css('bldc-button[elem-title="Bewaar"]'));
    const buttonNativeElement = buttonDebugElement.nativeElement;

    expect(buttonNativeElement.disabled).toBe(false);
    expect(component.bijzondereBepalingenForm?.valid).toBe(true)

  }));
});
