import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserPageComponent } from './file-browser-page.component';

describe('FileBrowserPageComponent', () => {
  let component: FileBrowserPageComponent;
  let fixture: ComponentFixture<FileBrowserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBrowserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
