import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsformComponent } from './productsform.component';

describe('ProductsformComponent', () => {
  let component: ProductsformComponent;
  let fixture: ComponentFixture<ProductsformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsformComponent]
    });
    fixture = TestBed.createComponent(ProductsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
