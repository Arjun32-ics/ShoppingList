import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error :string | undefined ;


  constructor(private authService : AuthService, private router : Router){}

  onSwitchMode(){
    this.isLogin = !this.isLogin;
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
        this.isLoading = false;
      }
  })
    form.reset();
  }
}
