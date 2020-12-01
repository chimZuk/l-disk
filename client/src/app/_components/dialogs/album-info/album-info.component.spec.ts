import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumInfoComponent } from './album-info.component';

describe('NewFolderComponent', () => {
  let component: AlbumInfoComponent;
  let fixture: ComponentFixture<AlbumInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
