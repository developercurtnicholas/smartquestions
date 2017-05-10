<?php

//Loads a user from the database
class User{

    private $username;
    private $email;
    private $firstname;
    private $lastname;
    private $haveloggedin;
    private $user_id;
    private $con;

    private $questionsAsked = array();

    function __construct($user_id, PDO $con){

        $this->con = $con;

    }

    private function loadUser(){
        $stmt = $this->con->prepare("SELECT * FROM user WHERE user_id = ?");
    }
}

?>