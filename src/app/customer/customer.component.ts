import { Component, OnInit } from '@angular/core';

import {  FormGroup, FormControl,Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { customerDetail } from '../models/customer-detail';
import {CustomerService} from '../shared/services/customer.services';

import { Subscription } from 'rxjs';

type AOA = any[][];

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' }; 
  customerForm:FormGroup;
  currentCol= 0;
  buusinessType:string;
  subscription: Subscription;
  constructor(private customerService: CustomerService) { 
     this.subscription = this.customerService.getBusinessType().subscribe(data => { 
    debugger
    this.buusinessType = data.type;
   })

  }

  ngOnInit(): void {
    this.customerForm =  new FormGroup({
      name: new FormControl('', Validators.required),
      id: new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy() { 
    this.subscription.unsubscribe();
}
  get getCustomerDetais(){ return this.customerForm.controls};

  onFileChange(evt: any) { 

    let target: DataTransfer = <DataTransfer>(evt.target); 
    debugger
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    if( this.buusinessType==null ||this.buusinessType==undefined) {
       alert('Please Select a Business Type');
       window.location.reload();
       return false;
    }
    
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]; 
debugger
     // this.data 
      let excelData= <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    let businessType=0;
    let swData=[];
    let hwata=[];
    let rowCount=0;
    let businessTypeName="";
    for(let i=0; i< excelData.length ; i++)
    {
      
      if(excelData[i].toString() == "SW"  )
      {
        businessTypeName=excelData[i].toString();
        rowCount=1;
        businessType=1;
      }else if (excelData[i].toString() == "HW")
      {
        rowCount=1;
        businessType=2;
        businessTypeName=excelData[i].toString();
      }
      if(rowCount == 2 && this.buusinessType == businessTypeName){
        this.customerForm.controls.id.patchValue(excelData[i][rowCount-1].toString() ); 
      }  
     else if(rowCount == 3 && this.buusinessType == businessTypeName){
        this.customerForm.controls.name.patchValue(excelData[i][rowCount-1].toString() );
      }else if(rowCount == 4 && this.buusinessType == businessTypeName){
        this.customerForm.controls.email.patchValue(excelData[i][rowCount-1].toString() );
      }
      if(businessType==1 && excelData[i].length > 1 && rowCount >4){
        swData.push(excelData[i]);
        //rowCount++;
      }else  if(businessType ==2 && excelData[i].length > 1 && rowCount >4){
        hwata.push(excelData[i]);
        //rowCount++;
      }
      rowCount++;
      
    }
    debugger
  let customerDetail:customerDetail ={
    name : this.getCustomerDetais.name.value,
    email : this.getCustomerDetais.email.value,
    calenderDetails : this.buusinessType=='SW' ? swData: this.buusinessType =="HW" ? hwata :null
  }
  debugger
    this.customerService.setDetails(customerDetail);
    //this.data =swData;
    /*  excelData.forEach(function (item) {
        debugger
          if(item[0] == "SW"  )
          {
            businessType=1;
          }else if (item[0] == "HW")
          {
            businessType=2;
          }

          if(businessType==1 && item.length > 1){
            swData.push(item);
          }else  if(businessType ==2 && item.length > 1){
            hwata.push(item);
          }

      })*/
      debugger
      
    };
    reader.readAsBinaryString(target.files[0]);
  }

  sendEmail(email){
    alert(email)
  }
 
}
