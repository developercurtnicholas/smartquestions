import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent }  from './app.component';
import { QuestionComponent } from './Components/question.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './Components/resgister.component'
import {LoginComponent, User} from  './Components/login.component'
import {HomeComponent} from './Components/homecomponent'
import {HttpModule} from '@angular/http';
import {AllQuestionsComponent} from "./Components/allquestionscomponent";
import {NavigationBarComponent} from "./Components/navbarcomponent";
import {LoginService} from "./Services/login.service";
import {AskComponent} from "./Components/ask.component";
import {SearchResultsComponent} from "./Components/SearchResultsComponent";
import {ProfileComponent} from "./Components/profilecomponent";
import {UpdaterComponent} from "./Components/updatercomponent";

@NgModule({
  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path : 'register', component: RegisterComponent},
      {path: '', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'ask/:title/:description/:update/:id',component : AskComponent},
      {path: 'question/:id', component : QuestionComponent },
      {path: 'results/:query/:type', component : SearchResultsComponent},
      {path: 'profile', component : ProfileComponent},
      {path: 'update/:title/:description',component : UpdaterComponent}
    ])
  ],
  declarations: [ AppComponent, QuestionComponent, RegisterComponent, LoginComponent, HomeComponent, AllQuestionsComponent,
  NavigationBarComponent,AskComponent, SearchResultsComponent, ProfileComponent,UpdaterComponent],
  providers : [LoginService],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
