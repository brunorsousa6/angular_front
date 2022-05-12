import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosRecebidosComponent } from './pedidos-recebidos.component';

describe('PedidosRecebidosComponent', () => {
  let component: PedidosRecebidosComponent;
  let fixture: ComponentFixture<PedidosRecebidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosRecebidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosRecebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
