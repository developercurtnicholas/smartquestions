<?php

require_once ("./DBCONNECT.php");
require_once ("./QuestionLoader.php");
require_once ("./User.php");
class LoadHomeData
{

    private $con;
    private $questionLoader;
    private $user;

    function __construct($user_id)
    {
        $this->con = DBCONNECT::CONNECT();
        $this->questionLoader = new QuestionLoader($this->con);
        $this->user = new User($_POST["user_id"],$this->con);
    }

    function __destruct()
    {
        $this->con = null;
    }

    function loadHome(){
        //Load the questions
        return array("questions" => $this->getQuestions());
    }

    private function getQuestions(){
        return $this->questionLoader->getAllQuestions();
    }

    private function getUserData(){

    }
}