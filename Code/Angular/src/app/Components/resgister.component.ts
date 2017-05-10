import { Component } from '@angular/core';
import {RegisterService} from "../Services/registerservice";

@Component({
    moduleId : module.id,
    selector : 'register',
    templateUrl : 'register.component.html',
    styleUrls : ['../Styles/login.component.css'],
    providers : [RegisterService]
})


export class RegisterComponent{

    firstname : string;
    lastname : string;
    username : string;
    email : string;
    password : string;
    confirm : string;

    constructor(private registerService : RegisterService){

    }

    register(){
        //Client side validation
        if(this.firstname == null || this.lastname == null){
            alert("Name fields can't be empty");
            return;
        }else if(this.firstname.length < 1 || this.lastname.length < 1 || !this.firstname.match(/[a-z]/i) || !this.lastname.match(/[a-z]/i)){
            alert("Name fields can't be empty");
            return;
        }

        //Validate the username
        if(this.username == null ){
            alert("Username must be at least 6 characters");
            return;
        }else if(this.username.length < 6 || !this.username.match(/[a-z]/i)){
            alert("Username must be at least 6 characters");
            return;
        }

        //Validate the password
        if(this.password == null){
            alert("Password needs to be at least six characters");
            return;
        }else if(this.password.length < 6){
            alert("Password needs to be at least six characters");
            return;
        }

        if(this.password != this.confirm){
            alert("Passwords do not match");
            return;
        }
        if(!this.validateEmail(this.email)){
            alert("Invalid email");
            return;
        }

        this.registerService.registerUser({firstname : this.firstname, lastname : this.lastname, username : this.username,
        email : this.email, password : this.password,confirm : this.confirm}).subscribe(
            data => this.onRegisterComplete(data)
        )
    }

    onRegisterComplete(data : {"success" : boolean}){
        if(data.success){
            alert("Thank you for registering with us, you may now log in with your credentials")
        }else{
            alert("Registration unsuccessful, Someone has that username or email already");
        }
    }
    validateEmail(email : string) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

export interface registerData{
    firstname : string,
    lastname : string,
    username : string,
    email : string,
    password : string,
    confirm : string
}