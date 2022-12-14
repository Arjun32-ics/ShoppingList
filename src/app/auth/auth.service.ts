import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, pipe, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponse{
    idToken: string,
    email: string,
    idTrefreshTokenoken: string,
    expiresIn: string,
    localId: string,
    registered? : string
}

@Injectable({providedIn:'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenexpirationTimer : any;


    constructor(private http : HttpClient,
        private router : Router){}

    signupForm(email:string,password:string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBseLxPR1am8aIpGYWxTACRcnOpirSiUCU',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.handleerror),
        tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn 
            )
        }));
    }

    login(email:string,password:string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBseLxPR1am8aIpGYWxTACRcnOpirSiUCU',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.handleerror),
        tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn 
            )
        }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/Auth']);
        localStorage.removeItem('userData');
        if(this.tokenexpirationTimer){
            clearTimeout(this.tokenexpirationTimer);
        }
        this.tokenexpirationTimer = null;
    }

    autologout(expirationDuration : number){
       this.tokenexpirationTimer= setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }

    private handleAuthentication(
        email :string,
        userId : string,
        token : string,
        expiresIn : number     
        ){
            const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
            const user = new User(email,userId,token,expirationDate);
            this.user.next(user);
            this.autologout(expiresIn*1000);
            localStorage.setItem('userData',JSON.stringify(user));
        }

        autologin(){
            const userData:{
                email : string,
                id:string,
                _token : string,
                _tokenexpirationDate:string
            } = JSON.parse(localStorage.getItem('userData'));

            if(!userData){
                return;
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenexpirationDate)
                );

                if(loadedUser.token){
                    this.user.next(loadedUser);
                    const expirationDuration =  new Date(userData._tokenexpirationDate).getTime() -
                    new Date().getTime();
                    this.autologout(expirationDuration);
                }
        }

    private handleerror(errorRes : HttpErrorResponse){
        let errormsg = 'An Error Occured';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errormsg)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            errormsg ='This email already exists'
            break;
            case 'EMAIL_NOT_FOUND':
                errormsg='This email doesnt exist'
                break;
                case 'INVALID_PASSWORD':
                    errormsg='The password is incorrect'
                    break;
        }
        return  throwError(errormsg)

    }
}