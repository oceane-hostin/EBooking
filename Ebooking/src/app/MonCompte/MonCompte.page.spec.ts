import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MonComptePage } from './MonCompte.page';

describe('MonComptePage', () => {
  let component: MonComptePage;
  let fixture: ComponentFixture<MonComptePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonComptePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MonComptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
