import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(
        private http : HttpClient,
        private recipeService : RecipeService,
        private authService : AuthService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipe();
        this.http.put(
            'https://recipebook-2022-default-rtdb.firebaseio.com/recipes.json',recipes
        ).subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipe(){
       return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://recipebook-2022-default-rtdb.firebaseio.com/recipes.json',
            {
                params : new HttpParams().set('auth',user.token)
            })
        }),map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients : recipe.ingredients ? recipe.ingredients : []};
            })
        }),tap(reciperesp=>{
            this.recipeService.setRecipe(reciperesp);
        }))
       
    }
}