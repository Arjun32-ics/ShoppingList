import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f')
  slform!: NgForm;
 subscription: Subscription = new Subscription;
 editedMode = false;
 editedIndex!: number;
 editedItem : Ingredient | undefined
  
  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number)=>{
               this.editedMode = true;
               this.editedIndex=index;
               this.editedItem = this.slService.getIndexIngredient(index);
               this.slform.setValue({
                name:this.editedItem.name,
                amount:this.editedItem.amount
               })
      }
    );
  }

  onSubmit(form : NgForm){
  const value = form.value;
  const newIngredient = new Ingredient(value.name,value.amount);
  if(this.editedMode){
    this.slService.updateIngredient(this.editedIndex,newIngredient)
  }else{
    this.slService.addIngredient(newIngredient);
  }
  this.editedMode = false;
  form.reset();
  }

  onClear(){
    this.slform.reset();
    this.editedMode= false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
