import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<any>{
    constructor(private datastorageService : DataStorageService,
        private recipeService : RecipeService){}

    resolve(route : ActivatedRouteSnapshot,state : RouterStateSnapshot){
        const recipes = this.recipeService.getRecipe();
        if(recipes.length == 0){
            return this.datastorageService.fetchRecipe();
        }else{
            return recipes;
        }
    }
}