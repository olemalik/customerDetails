import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { customerDetail } from 'src/app/models/customer-detail';

@Injectable()
export class CustomerService {
    private subjectCustomerDetails = new Subject<any>();
    private subjectBusinessType = new Subject<any>();

    setDetails(customerDetails:customerDetail) {
        this.subjectCustomerDetails.next({customerDetails });
    }
    getDetails(): Observable<any> {
        return this.subjectCustomerDetails.asObservable();
    }
    setBusinessType(type:string) {
        this.subjectBusinessType.next({type });
    }
    getBusinessType(): Observable<any> {
        return this.subjectBusinessType.asObservable();
    }
}