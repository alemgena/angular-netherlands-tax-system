import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AuthService} from "./service/auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Referentielijsten be visible', fakeAsync(() => {
    // @ts-ignore
    spyOn(authService, 'isLoggedIn').and.returnValue(false)
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelectorAll('bldc-navigation-item')
    const element = Array.from(text).find((el:any)=>el.textContent.trim() === 'Referentielijsten')
    tick()
    expect(element).toBeTruthy()
  }))
});
