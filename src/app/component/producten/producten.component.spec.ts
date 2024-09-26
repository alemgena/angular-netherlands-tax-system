import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductenComponent } from './producten.component';
import { ProductService } from '../../service/producten.service';
import { AuthService } from '../../service/auth.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {of} from "rxjs";
import {productenMockData} from "../../mockdata/product-mockdata";

describe('ProductenComponent', () => {
  let component: ProductenComponent;
  let fixture: ComponentFixture<ProductenComponent>;
  let productService: ProductService;
  let authService: AuthService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductenComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProductService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductenComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should be fetch all producten', () => {
    // @ts-ignore
    spyOn(productService, 'getAllProducten').and.returnValue(of(productenMockData));

    component.fetchAllProducten();
    fixture.detectChanges()

    expect(component.producten.length).toBe(1);
    expect(component.producten[0].code).toEqual("ABCD");
    expect(component.producten).toEqual(productenMockData);
  });
});
