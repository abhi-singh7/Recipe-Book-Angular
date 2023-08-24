import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
recipes:Recipe[] =[];
subscription:Subscription;


constructor(private recipeService:RecipeService, private router : Router,
  private activatedRoute: ActivatedRoute){

}


ngOnInit() {

 this.subscription= this.recipeService.recipeChanged
  .subscribe(
    (recipes:Recipe[])=>{
      this.recipes = recipes;
    }
  )




  this.recipes =this.recipeService.getRecipes();
  //console.log("recipes list are "+ this.recipes[0].name);
}




onNew(){
  this.router.navigate(['new'], {relativeTo:this.activatedRoute});

}

ngOnDestroy(): void {
  

  this.subscription.unsubscribe();
}


}
