import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
ingredients:Ingredient[] ;
ingSub: Subscription;

  constructor( private shoppingListSer: ShoppingListService){

  }

ngOnInit() {
  
  this.ingredients = this.shoppingListSer.getIngredients();
  this.ingSub=this.shoppingListSer.onIngredientsChanged
  .subscribe(
    (ingredient:Ingredient[])=>{
      this.ingredients= ingredient;
    }
  )

}


ngOnDestroy(): void {
  this.ingSub.unsubscribe();
}
onEditItem(index:number){

  this.shoppingListSer.startedEditing.next(index);
}


}
