
import {Component, OnInit} from "@angular/core";
import {QuestionService} from "../Services/question.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    moduleId :module.id,
    selector : 'update',
    templateUrl: 'asklayout.html',
    styleUrls : ['../Styles/askStyle.css'],
    providers : [QuestionService]
})

export class UpdaterComponent{

    subject : string;
    description : string;
    question_id : string;

    constructor(private route : ActivatedRoute){
        this.route.params.subscribe(
            params => {
                this.subject = params["title"];
                this.description = params["description"];
            }
        )
    }
}