import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarPedidosRecebidosComponent } from './apagar-pedidos-recebidos.component';

describe('ApagarPedidosRecebidosComponent', () => {
  let component: ApagarPedidosRecebidosComponent;
  let fixture: ComponentFixture<ApagarPedidosRecebidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApagarPedidosRecebidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarPedidosRecebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
