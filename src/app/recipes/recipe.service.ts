import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
recipeSelected = new Subject<Recipe>();
recipeChanged = new Subject<Recipe[]>();

    // private recipes : Recipe[] = [
    //     new Recipe(
    //         'Pizza',
    //         'Tasty',
    //         'https://th.bing.com/th/id/OIP.VJheVPW-C9sgHDbv1uOX4QHaFn?pid=ImgDet&rs=1',
    //     //'https://townsquare.media/site/959/files/2020/06/GettyImages-980860860.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89',
    //     [
    //         new Ingredient('PizzaBase',1),
    //         new Ingredient('PizzaSauce',2),

    //     ]),
    //     new Recipe(
    //         'Burger',
    //         'Yumm',
    //         'https://cmx.weightwatchers.com/assets-proxy/weight-watchers/image/upload/v1594406683/visitor-site/prod/ca/burgers_masthead_xtkxft',
    //     //'https://townsquare.media/site/959/files/2020/06/GettyImages-980860860.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89',
    //     [
    //         new Ingredient('Bread',1),
    //         new Ingredient('Potato',2),
    //     ])
    //   ]

      constructor(private slService : ShoppingListService){}

      private recipes : Recipe[] = [];

      setRecipe(recipe: Recipe[]){
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice())
      }

      getRecipe(): Recipe[]{
        return  this.recipes.slice();
      }

      getRecipeByIndex(index : number){
     return this.recipes[index]
      }

      addRecipeToshoppingCart(ingredient : Ingredient[]){
           this.slService.addRecipeIngredients(ingredient);
      }

      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number,newRecipe : Recipe){
        this.recipes[index] = newRecipe;
         this.recipeChanged.next(this.recipes.slice())
      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
      }
}