import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../accueil/accueil.module').then(m => m.AccueilPageModule)
          }
        ]
      },
      {
        path: 'MonCompte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Moncompte/Moncompte.module').then(m => m.MonComptePageModule)
          }
        ]
      },
      {
        path: 'MesFavoris',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../MesFavoris/MesFavoris.module').then(m => m.MesFavorisPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/accueil/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/accueil/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
