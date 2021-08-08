import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  exports: [ReactiveFormsModule,
    FormsModule]
})
export class SharedModule{}
