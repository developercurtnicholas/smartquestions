import {Injectable} from "@angular/core";
import {Http,URLSearchParams} from "@angular/http";
import {registerData} from "../Components/resgister.component";
@Injectable()


export class RegisterService{
    constructor(private http : Http){

    }

    registerUser(data : registerData){

        let params = new URLSearchParams();
        params.append("data" ,JSON.stringify(data));
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/Register.php',params).map(
            res => res.json()
        );
    }
}
