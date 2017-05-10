import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'; //To use the map function we have to import this
import {Http, URLSearchParams} from "@angular/http";
import {LoginService} from "./login.service";
import {User} from "../Components/login.component";

@Injectable()
export class HomeService{

    url : string;
    user : User;

    constructor(private http : Http,private loginService : LoginService){
        this.url = "http://www.topnhotch.com/SmartQuestions/Php/loadHome.php";
    }

    loadHomeData(email : string,user_id : string, password : string){

        let params = new URLSearchParams();
        params.append("email",email);
        params.append("password",password);
        params.append("user_id",user_id);
        let body = params.toString();
        return this.http.post(this.url,params).map(res => res.json());
    }
}
