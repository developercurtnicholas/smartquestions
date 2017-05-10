import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'; //To use the map function we have to import this
import {Http,URLSearchParams} from "@angular/http";
import {question} from "../Components/question.component";
import {partialTag} from "../Components/ask.component";

@Injectable()
export class QuestionCreatorService{

    constructor(private http : Http){

    }

    createQuestion(question : partialQuestion){
        let url = 'http://www.topnhotch.com/SmartQuestions/Php/createQuestion.php';
        let params = new URLSearchParams();
        params.append("question",JSON.stringify(question));
        return this.http.post(url,params).map(
            res => res.json()
        )
    }

    updateQuestiion(question : partialQuestion2){
        let url = 'http://www.topnhotch.com/SmartQuestions/Php/createQuestion.php';
        let params = new URLSearchParams();
        params.append("question",JSON.stringify(question));
        params.append("update","true");
        return this.http.post(url,params).map(
            res => res.json()
        );
    }
}

export interface partialQuestion{

    subject : string,
    description : string,
    user_id : string,
    votes : number,
    tagsArray : partialTag[]
}

export interface partialQuestion2{

    subject : string,
    description : string,
    user_id : string,
    votes : number,
    tagsArray : partialTag[],
    question_id : string
}