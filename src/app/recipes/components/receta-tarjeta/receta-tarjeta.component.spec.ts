import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaTarjetaComponent } from './receta-tarjeta.component';

describe('RecetaTarjetaComponent', () => {
  let component: RecetaTarjetaComponent;
  let fixture: ComponentFixture<RecetaTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecetaTarjetaComponent]
    });
    fixture = TestBed.createComponent(RecetaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
