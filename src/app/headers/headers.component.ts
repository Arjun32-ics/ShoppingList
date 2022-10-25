import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit,OnDestroy {
 @Output() featureselected = new EventEmitter<string>();
 isAuthenticated = false;
 private userSub: Subscription = new Subscription;
  
  constructor(private datastorageservice : DataStorageService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(user);
      console.log(!user);
      console.log(!!user);
    })
  }

  onSelect(feature:string){
    this.featureselected.emit(feature)
   }
 
  onstoreData(){
    this.datastorageservice.storeRecipe();
  }

  onfetchData(){
    this.datastorageservice.fetchRecipe().subscribe();
  }

  onLogOut(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
