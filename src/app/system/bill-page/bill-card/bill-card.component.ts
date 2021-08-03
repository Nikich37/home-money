import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill = new Bill(0,'');
  @Input() currency: any = {};

  dollar: number = 1;
  rub: number = 1;
  euro: number = 1;

  constructor() {}

  //base currency: EUR
  ngOnInit(): void {
    const { rates } = this.currency;
    this.rub = this.bill.value;
    this.euro = this.bill.value/rates['RUB'];
    this.dollar = this.bill.value / rates['RUB']*rates['USD'];
  }

}
