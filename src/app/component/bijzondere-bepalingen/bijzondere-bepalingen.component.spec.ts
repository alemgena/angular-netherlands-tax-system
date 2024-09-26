import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {BijzondereBepalingenComponent} from "./bijzondere-bepalingen.component";
import {BijzondereBepalingService} from "../../service/bijzondere-bepaling.service";
import {AantalTermijnen, BijzondereBepalingtypeModel, TermijnType} from "../../model/bijzondereBepalingtype.model";
import {of} from "rxjs";

describe('BijzondereBepalingenComponent', () => {
  let component: BijzondereBepalingenComponent;
  let fixture: ComponentFixture<BijzondereBepalingenComponent>;
  let httpTestingController: HttpTestingController;
  let bijzondereBepalingService: BijzondereBepalingService;

  const bijzondereBepalingTypeMockArray: BijzondereBepalingtypeModel[] = [
    {
      uuid: '1234',
      type: TermijnType.VERLENGING,
      reden: 'Example reason 1',
      aantal: AantalTermijnen.EEN,
      eersteTermijn: 10,
      opvolgendeTermijn: 5
    },
    {
      uuid: '5678',
      type: TermijnType.VERDAGING,
      reden: 'Example reason 2',
      aantal: AantalTermijnen.TWEE,
      eersteTermijn: 15,
      opvolgendeTermijn: 8
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BijzondereBepalingenComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BijzondereBepalingService],
    }).compileComponents();

    fixture = TestBed.createComponent(BijzondereBepalingenComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    bijzondereBepalingService = TestBed.inject(BijzondereBepalingService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Bijzondere Bepalingen', fakeAsync(() => {
    // @ts-ignore
    spyOn(bijzondereBepalingService, "getBijzondereBepalingen").and.returnValue(of(bijzondereBepalingTypeMockArray));
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(component.bijzondereBepalingen).toEqual(bijzondereBepalingTypeMockArray);
  }));
});
