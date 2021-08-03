import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any = {};

  euro: number = 1;
  dollar: number = 1;

  constructor() { }

  ngOnInit(): void {
    const {rates} = this.currency;

    this.euro = rates['RUB'];
    this.dollar = rates['RUB']/rates['USD'];
  }

}
