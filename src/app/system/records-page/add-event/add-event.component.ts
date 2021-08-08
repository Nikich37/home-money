import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment"

import {Category} from "../../shared/models/category.model";
import {NgForm} from "@angular/forms";
import {WFMEvent} from "../../shared/models/event.model";
import {EventsService} from "../../shared/services/events.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  @Input() categories: Category[] = [];
  message: Message = new Message('', '');
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ]

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;

    const event = new WFMEvent(type, +amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value: number = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage('Недостаточно средств на счету')
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value: value, currency: bill.currency})
          .subscribe();

       this.sub3 = this.eventsService.addEvent(event)
          .subscribe(() => {
            form.reset();
            this.showMessage('Событие успешно добавлено', 'success');
          })
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  private showMessage(text: string, type:string = 'danger'){
    this.message = new Message(type, text);
    window.setTimeout(()=>{
      this.message.text = '';
    }, 3000)
  }

}
