
import { Ingredient } from "../shared/ingredients.model";
import { Subject } from "rxjs";

export class ShoppingListService{

    onIngredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

private ingredients = [
  new Ingredient("Apples",5), 
  new Ingredient("Tomato",3)
];

getIngredients(){
    return this.ingredients.slice();
}

onAddIngredient(ingredient:Ingredient){
  this.ingredients.push(ingredient);
  this.onIngredientsChanged.next(this.ingredients.slice());

}


onToShoppingList(ingredients: Ingredient[]){

    // ingredients.forEach((ingredient)=>{
    //     this.ingredients.push(ingredient);
    // });
    this.ingredients.push(...ingredients);  // spread operator

    this.onIngredientsChanged.next(ingredients.slice());

    }

    getIngredient(index:number){
      return this.ingredients[index];
    }


    updateIngredient(index:number, newIngredient:Ingredient){
      this.ingredients[index]= newIngredient;
      this.onIngredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
      this.ingredients.splice(index,1);
      this.onIngredientsChanged.next(this.ingredients.slice());
}
    }




