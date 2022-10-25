import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    constructor(private http : HttpClient){}

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

    private handleAuthentication(
        email :string,
        userId : string,
        token : string,
        expiresIn : number     
        ){
            const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
            const user = new User(email,userId,token,expirationDate);
            this.user.next(user);
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