import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarProdutosComponent } from './apagar-produtos.component';

describe('ApagarProdutosComponent', () => {
  let component: ApagarProdutosComponent;
  let fixture: ComponentFixture<ApagarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApagarProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
