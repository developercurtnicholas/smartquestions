import {Component, OnInit} from "@angular/core";
import {QuestionCreatorService} from "../Services/questionCreator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../Services/question.service";
import {User} from "./login.component";
import {Question} from "./homecomponent";

@Component({
    moduleId :module.id,
    selector : 'ask',
    templateUrl: 'profilelayout.html',
    styleUrls : ['../Styles/profileStyle.css'],
    providers : [QuestionService]
})

export class ProfileComponent implements OnInit{

    user : User
    questions : Question[] = Array();
    title : string;
    description : string;
    ngOnInit(): void {

        this.user = JSON.parse(localStorage.getItem("user"));
        this.questionService.getQuestionByUser(this.user.user_id).subscribe(
            data => this.onDataRecieved(data)
        );
    }

    onDataRecieved(d : Question[]){
        this.questions = Array();
        for (let i = 0; i < d.length; i++) {
            this.questions.push(d[i]);
            console.log(this.questions[i]);
        }
    }

    //Update a question
    update(question : Question){
        this.router.navigate(['/ask',question.subject,question.description,true,question.question_id]);
    }
    //Delete a question
    delete(question_id : string){
        let choice = confirm("Are you sure you want to delete this question?");
        if(choice){
            this.questionService.deleteQuestion(question_id).subscribe(
                data => this.onDataDeleted(data)
            )
        }else{

        }
    }

    onDataDeleted(data : {success : boolean}){

        if(data.success){
            alert("Question Deleted");
        }else{
            alert("Failed to delete the question");
        }
    }

    constructor(private route : ActivatedRoute,private questionService : QuestionService,private router : Router){

    }

    loadQuestion(question : Question){
        this.router.navigate(['/question',question.question_id]);
    }
}
