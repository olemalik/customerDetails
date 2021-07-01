import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SortableModule } from 'ngx-bootstrap/sortable';
import {CustomerService} from './shared/services/customer.services';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
  //  FormsModule,
   // AppRoutingModule,
   // ReactiveFormsModule,
    CustomerComponent,
  CustomerDetailComponent,
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    [TabsModule.forRoot()],
    SortableModule.forRoot(),
    DragDropModule,
    NgxPrintModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
