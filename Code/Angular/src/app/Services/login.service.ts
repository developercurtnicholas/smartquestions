import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'; //To use the map function we have to import this
import {Http, Headers, URLSearchParams} from "@angular/http";
import {LoginData, User} from "../Components/login.component";
import {window} from "rxjs/operator/window";


@Injectable()
export class LoginService{

    user : User;
    loginData : LoginData;

    constructor(private http : Http){

    }

    //Get the login details for the user
    getLoginDetails(details : details){
        const headers = new Headers()
        headers.append('Content-Type','application/x-www-form-urlencoded');

       let params = new URLSearchParams();
        params.append("email",details.email);
        params.append("password",details.password);
        let body = params.toString();

        //Log the user in and fetch the data from the server
        let result = this.http.post(
            'http://www.topnhotch.com/SmartQuestions/Php/Login.php',body,{headers : headers}
        ).map(res =>
            res.json()
        );

        result.subscribe(
            data => this.onDataRecieved(data)
        );

        return result;
    }

    onDataRecieved(data : LoginData){

        console.log(data);
        this.user = data.user;

        localStorage.removeItem("user");
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(this.user));
    }
    getUserDetails(){
        return this.user;
    }
}
interface details{
    email : string;
    password : string;
}