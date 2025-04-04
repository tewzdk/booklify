import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayComponent } from './grid-display.component';

describe('GridDisplayComponent', () => {
  let component: GridDisplayComponent;
  let fixture: ComponentFixture<GridDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
