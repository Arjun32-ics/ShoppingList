import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,   
        DropDownDirective,

    ],
    imports:[CommonModule],
    exports:[
        CommonModule,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,   
        DropDownDirective,
    ]
})
export class SharedModule{}