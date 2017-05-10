import {Injectable} from "@angular/core";
import {Http,URLSearchParams} from "@angular/http";
@Injectable()


export class SearchService{
    constructor(private http : Http){

    }

    getQuestionsByTagName(tag : string){

        let params = new URLSearchParams();
        params.append("query" ,tag);
        params.append("tag","true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/search.php',params).map(
            res => res.json()
        );
    }
}
