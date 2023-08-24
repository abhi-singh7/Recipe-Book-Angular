import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(private shoppingListService:ShoppingListService, 
    private activatedRoutes: ActivatedRoute,
    private recipeServie: RecipeService,
    private router:Router){

  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.recipe = this.recipeServie.getRecipe(this.id);
      }
    )

}

onAddToShoppingList(){
  this.shoppingListService.onToShoppingList(this.recipe.ingredients);
}


onEditRecipe(){
this.router.navigate(['edit'],{relativeTo: this.activatedRoutes});
  //this.router.navigate(['../', this.id,'edit'], {relativeTo:this.activatedRoutes}) this is alternative approach

}

onDeleteRecipe(){
  this.recipeServie.deleteRecipe(this.id);
  this.router.navigate(['/recipes'],{relativeTo: this.activatedRoutes});

}


}
