import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
   private ingredients :Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Banana',7)
      ] ;

      getIngredient(){
          return this.ingredients.slice();
      }
      getIndexIngredient(index : number){
        return this.ingredients[index];
      }

      addIngredient(ingredient : Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice())
      }

      addRecipeIngredients(ingredient : Ingredient[]){
        //   for (let ingr of ingredient){
        //       this.addIngredient(ingr);
        //   }
           this.ingredients.push(...ingredient) //spread operator to push array of elements to list
           this.ingredientsChanged.next(this.ingredients.slice())
      }

      updateIngredient(index : number , newingredient : Ingredient){
        this.ingredients[index] = newingredient;
        this.ingredientsChanged.next(this.ingredients.slice())
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}