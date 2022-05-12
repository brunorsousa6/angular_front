import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarPedidoComponent } from './apagar-pedido.component';

describe('ApagarPedidoComponent', () => {
  let component: ApagarPedidoComponent;
  let fixture: ComponentFixture<ApagarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApagarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
