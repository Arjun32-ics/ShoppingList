import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http : HttpClient,
        private recipeService : RecipeService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipe();
        this.http.put(
            'https://recipebook-2022-default-rtdb.firebaseio.com/recipes.json',recipes
        ).subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipe(){
       return this.http.get<Recipe[]>('https://recipebook-2022-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients : recipe.ingredients ? recipe.ingredients : []};
            })
        }),tap(reciperesp=>{
            this.recipeService.setRecipe(reciperesp);
        })
        )
    }
}