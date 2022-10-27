import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLogin = true;
  isLoading = false;
  error :string | undefined ;
  @ViewChild(PlaceHolderDirective) hostalert : PlaceHolderDirective
  private closeSub : Subscription;


  constructor(private authService : AuthService, 
    private router : Router,
    public componentFactoryResolver : ComponentFactoryResolver,){}

  onSwitchMode(){
    this.isLogin = !this.isLogin;
  }

  onHandleError(){
    this.error=null;
  }
ngOnDestroy() {
  if(this.closeSub){
    this.closeSub.unsubscribe();
  }
  
}
  private showErrorMessafe(errorMessage : string){
    const alertComponentResolver = 
    this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.hostalert.viewContainerRef;
    hostViewContainerRef.clear();
   const CmpRef= hostViewContainerRef.createComponent(alertComponentResolver);
   CmpRef.instance.message=errorMessage;
   this.closeSub=CmpRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
   })
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs : Observable<AuthResponse>;
    if(this.isLogin){
       authObs = this.authService.login(email,password);
    }else{
      // this.authService.signupForm(email,password).subscribe(resp=>{
      //   console.log(resp);
      // },error=>{
      //   console.log(error);
      // })
      authObs=this.authService.signupForm(email,password)
    }
    
    authObs.subscribe({
      next: (resp) => {
      console.log(resp)
      this.isLoading = false;
      this.router.navigate(['/recipes'])
      },
      error: (error) => {
        console.log(error);
        this.error=error;
        this.showErrorMessafe(error);
        this.isLoading = false;
      }
  })
    form.reset();
  }
}
