import { Component } from '@angular/core';
import { CustomerService } from './shared/services/customer.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerDetails'; 
  constructor(private customerService: CustomerService) { }

  onBuusinessType(type){ 
    this.customerService.setBusinessType(type);
  }
}
