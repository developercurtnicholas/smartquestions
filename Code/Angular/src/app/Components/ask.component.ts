import {Component} from "@angular/core";
import {User} from "./login.component";
import {QuestionCreatorService} from "../Services/questionCreator.service";
import {question, tag} from "./question.component";
import {forEach} from "@angular/router/src/utils/collection";
import {ActivatedRoute} from "@angular/router";
@Component({
    moduleId :module.id,
    selector : 'ask',
    templateUrl: 'asklayout.html',
    styleUrls : ['../Styles/askStyle.css'],
    providers : [QuestionCreatorService]
})

export class AskComponent{

    user : User
    description : string;
    subject : string;
    question : question;
    question_id : string;
    tags : partialTag[] = Array();
    currentTag : string;
    update : string;

    constructor(private questionCreator : QuestionCreatorService,private router : ActivatedRoute){

        this.user = JSON.parse(localStorage.getItem("user"));

        this.router.params.subscribe(
            params => {
                this.subject = params["title"];
                this.description = params["description"];
                this.update = params["update"];
                this.question_id = params["id"];
            }
        )

    }

    onDataRecieved(success : result){

        if(success.success){
            alert("Your question has been created");
        }else{
            alert("Something went wrong while processing your request, please try again");
        }
    }

    addTag(){
        if(this.tags.length <= 5 && this.currentTag != " " && this.currentTag != "" && this.currentTag != null){

            for(let t of this.tags){
                if(t.name == this.currentTag){
                    this.currentTag = "";
                    return;
                }
            }
            this.tags.push({name : this.currentTag});
        }
        this.currentTag = "";
    }

    removeTag(tag : tag){

        var tagname = tag.name;
        for(var i = 0; i < this.tags.length;i++){

            var current = this.tags[i];
            if(current.name == tagname){
                this.tags.splice(i,1);
            }
        }
    }
    create() {

        //Have to have at least one tag
        if (this.tags.length < 1) {
            alert("You have to have at least one tag");
            return;
        }

        if (this.subject.length < 20) {
            alert("Subject Should be at least 20 characters");
            return;
        }

        if (this.description.length < 30) {
            alert("Description should be at least 30 characters")
            return;
        }

        if (this.update == "true") {
            this.questionCreator.updateQuestiion({
                subject: this.subject, description: this.description,
                user_id: this.user.user_id, votes: 0, tagsArray: this.tags,question_id : this.question_id
            }).subscribe(
                data => this.onDataRecieved(data)
            );
        } else {
            this.questionCreator.createQuestion({subject:this.subject,description:this.description,
                user_id:this.user.user_id,votes:0,tagsArray : this.tags}).subscribe(
                data => this.onDataRecieved(data)
            );
        }
    }
}

export interface partialTag{
    name : string;
}

interface result{
    success : boolean
}