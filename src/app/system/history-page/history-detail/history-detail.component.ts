import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CategoriesService} from "../../shared/services/categories.service";
import {EventsService} from "../../shared/services/events.service";
import {WFMEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  event: WFMEvent = new WFMEvent('', 0, 1, '', '');
  category: Category = new Category('', 0);
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params)=>{
        this.eventsService.getEventById(params['id'])
          .subscribe((event: WFMEvent)=>{
            this.event = event;
            this.categoriesService.getCategoryById(event.category)
              .subscribe((category: Category)=>{
                this.category = category;
                this.isLoaded = true;
              })
          });
      })
  }

}
