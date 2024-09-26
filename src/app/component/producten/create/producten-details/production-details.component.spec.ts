import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ProductionDetailsComponent } from './production-details.component';
import {ProductService} from "../../../../service/producten.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../../../service/auth.service";
import {ProductenModel} from "../../../../model/producten.model";
import {of} from "rxjs";

describe('ProductenDetailsComponent', () => {
  let component: ProductionDetailsComponent;
  let fixture: ComponentFixture<ProductionDetailsComponent>;
  let productService: ProductService;
  let authService: AuthService
  let product: ProductenModel =  {
    uuid: '1',
    url: 'http://example.com/product-1',
    code: 'ABCD',
    naam: 'string',
    varianten: [],
    omschrijving: 'string',
    beoogdResultaat: 'string',
    einddatumGeldigheid: '2024-12-31',
    begindatumGeldigheid: '2023-01-01',
    wijzigingsdatum: '2023-06-15',
    toelichting: 'string',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProductService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    // @ts-ignore
    spyOn(productService, 'getUuid').and.returnValue(of('1234'))

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product data on init', fakeAsync(() => {
    // @ts-ignore
    spyOn(productService, 'getProduct').and.returnValue(Promise.resolve(product));

    component.ngOnInit();
    productService.getProduct("1234")
    fixture.detectChanges();
    tick()

    expect(productService.getProduct).toHaveBeenCalledWith('1234');
    expect(component.product).toBeDefined()
    expect(component.product).toEqual(product);
  }));

  it('should disable the button for an invalid input field', fakeAsync(() => {
    // @ts-ignore
    spyOn(productService, 'getProduct').and.returnValue(Promise.resolve(product));
    component.ngOnInit()

    component.productForm?.setValue({
      naam: 'te',
      code:"test",
      einddatumGeldigheid: "",
      beoogdResultaat: "",
      wijzigingsdatum: "",
      omschrijving: "",
      toelichting: ""
    })

    fixture.detectChanges()

    expect(component.productForm?.valid).toBe(false)

  }));


  it('should enable the button for an invalid input field', fakeAsync(() => {
    // @ts-ignore
    spyOn(productService, 'getProduct').and.returnValue(Promise.resolve(product));
    component.ngOnInit()

    component.productForm?.setValue({
      naam: 'test',
      code:"test",
      einddatumGeldigheid: "",
      beoogdResultaat: "",
      wijzigingsdatum: "",
      omschrijving: "test",
      toelichting: "test"
    })

    fixture.detectChanges()

    expect(component.productForm?.valid).toBe(true)

  }));
});
