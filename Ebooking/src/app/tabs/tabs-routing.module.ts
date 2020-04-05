import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          },
          {
            path: 'login',
            loadChildren: () =>
              import('../login/login.module').then(m => m.LoginPageModule)
          },
          {
            path: 'create',
            loadChildren: () =>
              import('../create-account/create-account.module').then(m => m.CreateAccountPageModule)
          },
          {
            path: 'update',
            loadChildren: () =>
              import('../update-account/update-account.module').then(m => m.UpdateAccountPageModule)
          },
          {
            path: 'housing',
            children: [
              {
                path: '',
                loadChildren: () =>
                import('../housing/housing.module').then(m => m.HousingPageModule)
              },
              {
                path: 'update',
                loadChildren: () =>
                    import('../update-housing/update-housing.module').then(m => m.UpdateHousingPageModule)
              }
            ]
          },
          {
            path: 'booking',
            loadChildren: () =>
                import('../booking/booking.module').then(m => m.BookingPageModule)
          }
        ]
      },
      {
        path: 'housing/create',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create-housing/create-housing.module').then(m => m.CreateHousingPageModule)
          }
        ]
      },
      {
        path: 'unlock',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../unlock/unlock.module').then(m => m.UnlockPageModule)
          }
        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: 'housing',
            children: [
              {
                path: '',
                loadChildren: () =>
                    import('../housing/housing.module').then(m => m.HousingPageModule)
              },
              {
                path: 'booking',
                loadChildren: () =>
                    import('../create-booking/create-booking.module').then(m => m.CreateBookingPageModule)
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
