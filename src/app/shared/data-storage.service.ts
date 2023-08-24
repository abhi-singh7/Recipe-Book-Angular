import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root', // alternative to provide in provider array in app module
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServie: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeServie.getRecipes();
    this.http
      .put('https://angular-18092.firebaseio.com/recipes.json', recipes)
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchRecipes() {
    
        return this.http.get<Recipe[]>(
          'https://angular-18092.firebaseio.com/recipes.json',
          
        ).pipe(
            map((recipes) => {
                return recipes.map((recipe) => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : [],
                  };
                });
              }),
              tap((response) => {
                this.recipeServie.setRecipes(response);
              })
        );
      
  }
}
