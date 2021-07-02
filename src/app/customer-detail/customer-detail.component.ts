import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { customerDetail } from '../models/customer-detail';

import {CustomerService} from '../shared/services/customer.services';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  subscription: Subscription;
  name: string;
  email: string;
  calenderDetails :any;
  constructor(private customerService: CustomerService) { 
    this.subscription = this.customerService.getDetails().subscribe(data => { 
      debugger
      this.email = data.customerDetails.email;
      this.name = data.customerDetails.name;
      this.calenderDetails =data.customerDetails.calenderDetails;
     })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() { 
    this.subscription.unsubscribe();
}
}
