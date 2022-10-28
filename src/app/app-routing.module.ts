import { NgModule } from "@angular/core";
import {  PreloadAllModules, RouterModule, Routes } from "@angular/router";
const appRoute : Routes = [
    {path : '',redirectTo : '/recipes',pathMatch : 'full'},
    // {path : 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'}
    {path:'recipes',loadChildren:()=>import('./recipes/recipe.module').then(m=>m.RecipeModule)}
    ,{path:'shopping-list',loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
    {path:'Auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoute,{
        preloadingStrategy:PreloadAllModules
    })],
    exports : [RouterModule]
}
)
export class AppRoutingModule{

}


