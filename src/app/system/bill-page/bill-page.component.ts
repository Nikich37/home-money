import {Component, OnInit, OnDestroy} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Bill} from "../shared/models/bill.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscriptionBill: Subscription = new Subscription();
  subscriptionCurrency: Subscription = new Subscription();
  subscriptionCurrency2: Subscription = new Subscription();

  currency: any;
  bill: any;

  isLoaded1: boolean = false;
  isLoaded2: boolean = false;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.subscriptionBill = this.billService.getBill()
      .subscribe((bill: Bill) => {
        this.bill = bill;
        this.isLoaded1 = true;
      })
    this.subscriptionCurrency = this.billService.getCurrency()
      .subscribe((data: any) => {
        this.currency = data;
        this.isLoaded2 = true;
      })

  }

  ngOnDestroy() {
  this.subscriptionBill.unsubscribe();
  this.subscriptionCurrency.unsubscribe();
  if(this.subscriptionCurrency2) {
    this.subscriptionCurrency2.unsubscribe();
  }
  }

  onRefresh() {
    this.isLoaded2 = false;
    this.subscriptionCurrency2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded2 = true;
      })
  }

}
