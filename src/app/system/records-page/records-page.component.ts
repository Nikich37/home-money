import {Component, OnChanges, OnInit} from '@angular/core';
import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded: boolean = false;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  newCategoryAdded(category: Category) {
    let newCategory = new Category(category.name, category.capacity,
      this.categories[this.categories.length - 1].id! + 1);
    this.categories.push(newCategory);
  }

}
