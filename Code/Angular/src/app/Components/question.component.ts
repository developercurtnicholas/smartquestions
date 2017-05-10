import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../Services/question.service';
import {ActivatedRoute} from "@angular/router";
import {Question} from "./homecomponent";
import {User} from "./login.component";

@Component({

    moduleId: module.id,
    selector: 'question',
    templateUrl: 'question.component.html',
    styleUrls : [
        '../Styles/question.component.css'
    ],
    providers:[QuestionService]
})

export class QuestionComponent implements OnInit{

    user : User;
    subject : string;
    description: string;
    asker : string;
    category: string;
    question_id : string;
    tags : string[];
    answers : Answer[];
    submission : string;
    views : number;
    question : Question;
    votes : number;

    votedOnQuestion : boolean = false;
    votedOnAnswer : boolean = false;

    constructor(private questionService : QuestionService, private route :ActivatedRoute){

    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("user"));

        this.route.params.subscribe(
            params => {
                this.question_id =  this.route.snapshot.params["id"];
                this.getQuestions();
                this.getAnswers();
            }
        );
    }

    private getQuestions(){

        this.questionService.getQuestion(this.question_id).subscribe(
            data => this.onDataRecieved(data)
        );
    }

    private getAnswers(){
        this.questionService.getAnswers(this.question_id).subscribe(
            data => this.onAnswersLoaded(data)
        );
    }

    onAnswersLoaded(data : Answer[]){
        console.log("ANSWERS: "+ data);
        this.answers = data;
    }
/////////////////////////////////////ANSWER VOTED UP
    upVote(answer : Answer){


        this.questionService.upVoteAnswer(answer.answer_id).subscribe(

            data => this.onAnswerUp(data,answer)
        )
    }
    onAnswerUp(data : {success : boolean},answer : Answer){
        if(data.success){
            answer.upvotes++;
            this.votedOnAnswer = true;
        }else{

        }
    }
///////////////ANSWER VOTED DOWN
    downVote(answer: Answer){

        this.questionService.downVoteAnswer(answer.answer_id).subscribe(

            data => this.onAnswerDown(data,answer)
        )
    }
    onAnswerDown(data : {success : boolean },answer : Answer){

        if(data.success){
            answer.upvotes--;
            this.votedOnAnswer = true;
        }else{

        }
    }
//////////////QUESTION VOTED UP//////////////
    upVoteQuestion(){

        if(this.question.user_id == this.user.user_id){
            alert("You cant vote on your own question, that's cheating");
            return;
        }

        if(this.votedOnQuestion == true){
            alert("you already voted");
            return;
        }

        this.questionService.upVoteQuestion(this.question_id).subscribe(
            data => this.onQuestionUp(data)
        )
    }

    onQuestionUp(data : {success : boolean}){

        if(data.success){
            this.votedOnQuestion = true;
            this.votes++;
        }

    }
/////////QUESTION VOTED DOWN////////////////
    downVoteQuestion(){

        if(this.question.user_id == this.user.user_id){
            alert("You cant vote on your own question, that's cheating");
            return;
        }

        if(this.votedOnQuestion == true){
            alert("you already voted");
            return;
        }
        this.questionService.downVoteQuestion(this.question_id).subscribe(
            data => this.onQuestionDown(data)
        )
    }

    onQuestionDown(data : {success : boolean}){
        if(data.success){
            this.votedOnQuestion = true;
            this.votes--;
        }
    }
/////////////////////////
    addAnswer(submission : string){

        this.questionService.addAnswer({user_id : this.user.user_id,user : this.user.username,question_id : this.question_id
            ,answer : submission,upvotes: 0}).subscribe(
            data => this.onAnswerAdded(data)
        );

    }

    onAnswerAdded(data : {success : boolean}){

        this.getAnswers();

        if(data.success){
            alert("Your answer was added");
        }else{
            alert("Something went wrong, Please try again :(");
        }

    }

    onDataRecieved(question : Question){

        this.question = question;

        this.subject = question.subject;
        this.description = question.description;
        this.votes = question.votes;
    }
}

export interface Answer{
    user_id : string;
    answer_id : string;
    question_id : string;
    answer: string;
    upvotes: number;
}
//interface that defines a question
export interface question{
    description : string;
    subject : string;
    user_id : string;
    votes : number;
    tags : tag[];
    views : number;
    time : Date;

}
export interface tag{
    name :string;
    question_id : string;
}