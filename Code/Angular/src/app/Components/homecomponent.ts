import {Component, OnInit} from "@angular/core";
import {HomeService} from "../Services/homeservice";
import {Router} from "@angular/router";
import {LoginService} from "../Services/login.service";
import {User} from "./login.component";
import {QuestionService} from "../Services/question.service";
import {tag} from "./question.component";

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : 'homelayout.html',
    providers : [HomeService]
})

export class HomeComponent implements OnInit {

    user: User;
    questions: Question[] = new Array();

    //On initialization of the home component
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("user"));

        if(this.user == null){
            alert("Plese login to continue");
        }

        this.homeloader.loadHomeData(this.user.email, this.user.user_id, this.user.password).subscribe(
            data => this.onDataRecieved(data)
        )

    }


    constructor(private homeloader: HomeService, private loginservice: LoginService, private router : Router) {

    }

    onDataRecieved(d: HomeData) {
        console.log(d);
        for (let i = 0; i < d.questions.length; i++) {
            this.questions.push(d.questions[i]);
            console.log(this.questions[i]);
        }

    }


}
export interface Question{

    question_id : string;
    description : string;
    subject : string;
    user_id : string;
    answercount : string;
    answer_id : string;
    votes : number;
    tagsArray : tag[];
    tags : string;
    username : string;
    time : string;
}
export interface HomeData{
    questions : Question[];
}


