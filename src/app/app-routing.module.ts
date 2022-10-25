import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoute : Routes = [
    {path : '',redirectTo : '/recipes',pathMatch : 'full'},
    {
        path : 'recipes',
        component : RecipesComponent,
        canActivate :[AuthGuard],
        children:[
        {path : '', component : RecipeStartComponent},
        {path : 'new', component : RecipeEditComponent},
        {
         path : ':id',
         component : RecipeDetailComponent,
         resolve:[RecipeResolverService]
        },
        {path : ':id/edit', component : RecipeEditComponent,resolve:[RecipeResolverService]}

    ]},
    {path : 'shopping-list',component : ShoppingListComponent},
    {path : 'Auth',component : AuthComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports : [RouterModule]
}
)
export class AppRoutingModule{

}


