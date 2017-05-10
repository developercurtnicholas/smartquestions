/**
 * Created by Kurt on 5/10/2017.
 */

import {Component, OnInit} from "@angular/core";
import {SearchService} from "../Services/searchservice";
import {ActivatedRoute} from "@angular/router";
import {Question} from "./homecomponent";
import {User} from "./login.component";
@Component({
    moduleId : module.id,
    selector : 'searchresults',
    providers : [SearchService],
    templateUrl: 'results.html'
})

export class SearchResultsComponent implements OnInit{

    query : string;
    type : string;
    questions : Question[] = Array();
    user : User;
    constructor(private search : SearchService, private router : ActivatedRoute){

    }


    ngOnInit(): void {

        this.user = JSON.parse(localStorage.getItem("user"));



        this.router.params.subscribe(
            params => {

                this.query = params["query"];
                this.type = params["type"];

                console.log(this.query);
                console.log(this.type);

                //Searching by tags
                if(this.type){

                    this.search.getQuestionsByTagName(this.query).subscribe(
                        data => this.onTagResultsRecieved(data)
                    )

                }else{//Searching by tite and description

                }
            }
        );
    }

    onTagResultsRecieved(d: Question[]){

        console.log(d);

        this.questions = Array();
        for (let i = 0; i < d.length; i++) {
            this.questions.push(d[i]);
        }
    }
    onSearchResultsRecieved(){

    }



}