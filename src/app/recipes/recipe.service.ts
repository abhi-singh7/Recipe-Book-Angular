import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();


    constructor(){}

//  private recipe =  [
//   new Recipe("A Test Recipe1", "A test recipes",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9itU-6W5OZO-L_56BAxzkwUjixywQYfQEJg&usqp=CAU",
//   [new Ingredient("Bread",10),
// new Ingredient("Chicket",1)]),
//   new Recipe("A Test Recipe2", "A test recipes second","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9itU-6W5OZO-L_56BAxzkwUjixywQYfQEJg&usqp=CAU",
//   [new Ingredient("Buns",5),
// new Ingredient("French Fries",2)])
// ];

private recipe :Recipe[]=[];

setRecipes(recipes:Recipe[]){
  this.recipe= recipes;
  this.recipeChanged.next(recipes.slice());
}

getRecipes(){
    return this.recipe.slice();
}

getRecipe(index:number){
    return this.recipe.slice()[index];
}


addRecipe(recipe:Recipe){
  this.recipe.push(recipe);
  this.recipeChanged.next(this.recipe.slice());
}

updateRecipe(index:number, newRecipe: Recipe){
  this.recipe[index] = newRecipe;
  this.recipeChanged.next(this.recipe.slice());
}

deleteRecipe(id: number){


  this.recipe.splice(id,1);
  this.recipeChanged.next(this.recipe.slice());

}


}