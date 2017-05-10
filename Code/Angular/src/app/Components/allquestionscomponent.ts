import {Component} from "@angular/core";
import {QuestionService} from "../Services/question.service";
import {Router} from "@angular/router";
import {Question} from "./homecomponent";

@Component({
    moduleId:module.id,
    selector : 'allquestions',
    templateUrl : 'allquestionslayout.html',
    providers:[QuestionService],
    inputs:['questions'],
    styleUrls : ["../Styles/allquestionstyle.css"]
})

export class AllQuestionsComponent{
    constructor(private router : Router){

    }

    ask(){
        this.router.navigate(["/ask","","",false,""]);
    }

    loadTags(question : Question){

    }

    loadQuestion(question : Question){
        this.router.navigate(['/question',question.question_id]);
    }

}

