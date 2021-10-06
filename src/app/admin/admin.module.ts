import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule } from '@angular/forms';
import { FilterTicketsPipe } from '../_pipes/filter-tickets.pipe';
import { PswLengthValidatorDirective } from '../_directives/pswlength.validator';






@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    NavComponent,
    HomeComponent,
    TicketComponent,
    FilterTicketsPipe,
    PswLengthValidatorDirective


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  exports: [
    FooterComponent
  ]
})
export class AdminModule { }
