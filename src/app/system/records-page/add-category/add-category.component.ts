import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  sub1: Subscription = new Subscription();
  message: Message = new Message('', '');
  @Output() onCategoryAdd: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe(()=>{
        this.onCategoryAdd.emit(category);
      });
    form.reset();
    this.showMessage('Категория успешно добавлена', 'success');
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
