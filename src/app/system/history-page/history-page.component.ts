import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {WFMEvent} from "../shared/models/event.model";

// noinspection JSDeprecatedSymbols
@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  categories: Category[] = [];
  events: WFMEvent[] = [];



  isLoaded: boolean = false;
  sub1: Subscription = new Subscription();

  chartData: any = [];


  ngOnInit(): void {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) =>{
    this.categories = data[0];
    this.events = data[1];

    this.calculateChartData();

    this.isLoaded = true;
    });
  }

  calculateChartData(): void{
    this.chartData = [];

    this.categories.forEach((cat) =>{
      const catEvents = this.events.filter((e) =>{
        return e.category === cat.id && e.type === 'outcome'
      });
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e)=>{
          total += e.amount;
          return total;
        }, 0)
      });
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
