import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConsumidorComponent } from './cadastro-consumidor.component';

describe('CadastroConsumidorComponent', () => {
  let component: CadastroConsumidorComponent;
  let fixture: ComponentFixture<CadastroConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroConsumidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
