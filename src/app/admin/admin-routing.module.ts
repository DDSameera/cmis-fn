import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [

      {
        path: 'ticket',
        component: TicketComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
