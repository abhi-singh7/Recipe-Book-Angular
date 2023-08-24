import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm:NgForm;

subscription:Subscription;
editedItemIndex:number;
editMode = false;
editedItem:Ingredient;



constructor(private shoppingListserv: ShoppingListService){

}

ngOnInit(): void {
  this.subscription = this.shoppingListserv.startedEditing.subscribe(
    (index:number)=>{
      this.editedItemIndex = index;
      this.editMode=true;
      this.editedItem= this.shoppingListserv.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    }
  )
}


onAddItem(form:NgForm){
const value = form.value;
console.log(value);
const newIngredient = new Ingredient(value.name, value.amount);
if (this.editMode){
  this.shoppingListserv.updateIngredient(this.editedItemIndex, newIngredient);
  
}else{
this.shoppingListserv.onAddIngredient(newIngredient);
}
this.editMode=false;
this.slForm.reset();
}

onClear(){
  this.slForm.reset();
  this.editMode= false;
}
onDelete(){
  
  this.shoppingListserv.deleteIngredient(this.editedItemIndex);
  this.onClear();
}



ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
