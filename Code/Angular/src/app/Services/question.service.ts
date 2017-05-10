import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'; //To use the map function we have to import this
import {Http,URLSearchParams} from "@angular/http";

@Injectable()
export class QuestionService{
    constructor(private http : Http ){
        console.log("question  service initialized....");
    }

    //Get a specific question
    getQuestion(question_id : string){

        let params = new URLSearchParams();
        params.append("question_id" ,question_id);
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    getQuestionByUser(user_id : string){

        let params = new URLSearchParams();
        params.append("user_id" ,user_id);
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }



    deleteQuestion(question_id : string){
        let params = new URLSearchParams();
        params.append("question_id", question_id);
        params.append("delete","true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    upVoteAnswer(answer_id : string){
        let params = new URLSearchParams();
        params.append("answer_id" ,answer_id);
        params.append("upanswer", "true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    downVoteAnswer(answer_id : string){
        let params = new URLSearchParams();
        params.append("answer_id" ,answer_id);
        params.append("downanswer", "true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    upVoteQuestion(question_id : string){
        let params = new URLSearchParams();
        params.append("question_id" ,question_id);
        params.append("upquestion", "true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    downVoteQuestion(question_id : string){
        let params = new URLSearchParams();
        params.append("question_id" ,question_id);
        params.append("downquestion", "true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    getQuestionTags(question_id : string){

        let params = new URLSearchParams();
        params.append("question_id" ,question_id);
        params.append("fortags", "true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );

    }

    getAnswers(question_id : string){

        let params = new URLSearchParams();
        params.append("question_id" ,question_id);
        params.append("foranswers","true");
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/getquestions.php',params).map(
            res => res.json()
        );
    }

    addAnswer(answer : partialAnswer){

        let params = new URLSearchParams();
        params.append("answer" ,JSON.stringify(answer));
        return this.http.post('http://www.topnhotch.com/SmartQuestions/Php/addAnswer.php',params).map(
            res => res.json()
        );
    }
}

interface partialAnswer{
    user_id : string;
    user : string;
    question_id : string;
    answer: string;
    upvotes: number;
}