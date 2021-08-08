import {Component, Input, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Message} from "../../../shared/models/message.model";
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription = new Subscription();

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter<Category>();

  currentCategoryId: number = 1;
  currentCategory: Category = this.categories[0];

  message: Message = new Message('', '');
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.onCategoryChange();
  }

  onSubmit(form: NgForm){
    const {capacity, name} = form.value;
    const category = new Category(name, capacity, this.currentCategory.id);

    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category)=>{
        let index = this.categories.indexOf(this.categories.find(c =>
          c.id === this.currentCategory.id)!);
        this.categories[index] = category;
        this.showMessage('Категория успешно изменена', 'success');
      })
  }

  onCategoryChange(){
    let category = this.categories
      .find(c => c.id === +this.currentCategoryId);
    if(category){
      this.currentCategory = category;
    }
  }

  private showMessage(text: string, type:string = 'danger'){
    this.message = new Message(type, text);
    window.setTimeout(()=>{
      this.message.text = '';
    }, 3000)
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
