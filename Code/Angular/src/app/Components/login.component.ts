import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../Services/login.service";

@Component({
    moduleId : module.id,
    selector : 'login',
    templateUrl : 'login.component.html',
    styleUrls : ['../Styles/login.component.css'],
})

export class LoginComponent{

    email : string;
    password : string;
    data : LoginData;
    loginService : LoginService;
    loginResult : LoginData;


    constructor(loginService : LoginService,private router : Router){
        localStorage.removeItem("user");
        this.loginService = loginService;
    }

    login(loginData : LoginData){
        this.loginService.getLoginDetails({email : this.email, password: this.password}).subscribe(
            data => this.onDataRecieved(data)
        )
    }

    //Get back json response from server
    private onDataRecieved(data : LoginData){

        localStorage.removeItem("user");
        localStorage.setItem("user",JSON.stringify(data.user));
        //Check if login was successfull
        if(data.success){

            this.router.navigateByUrl("/home");
        }else{
            console.log(data);
            alert("Login Failed Incorret username or password");
        }
    }
}

export interface User{

    email : string;
    firstname: string;
    haveloggedin : string;
    lastname : string;
    password :string;
    user_id : string;
    username : string;
}

export interface LoginData{
    success : boolean;
    user: User;
}
