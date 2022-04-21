import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAndMagazinesComponent } from './books-and-magazines.component';

describe('BooksAndMagazinesComponent', () => {
  let component: BooksAndMagazinesComponent;
  let fixture: ComponentFixture<BooksAndMagazinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksAndMagazinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAndMagazinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
