import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MesFavorisPage } from './MesFavoris.page';

describe('MesFavorisPage', () => {
  let component: MesFavorisPage;
  let fixture: ComponentFixture<MesFavorisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MesFavorisPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MesFavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
