import {Component, Input} from "@angular/core";
import construct = Reflect.construct;
import {Router} from "@angular/router";
@Component({
    moduleId : module.id,
    selector : 'navbar',
    templateUrl : 'navbarlayout.html',
    styleUrls : ['../Styles/navbarstyle.css'],
    inputs : ['user']
})

export class NavigationBarComponent{

    query : string;
    bytag  : boolean = true;
    constructor(private router : Router){

    }

    search(){

        this.router.navigate(['/results',this.query,this.bytag]);
    }
}