<?php

require_once ("./DBCONNECT.php");
class RegisterClass{

    private $con;
    private $result;

    //Constructor connects to the database
    function __construct(){
        $this->con = DBCONNECT::CONNECT();
    }

    //Nullify the connection
    function __destruct()
    {
        $this->con = null;
    }

    //Register a user
    function registerUser($data){
            //Insert the user into the database
            $stmt = $this->con->prepare("INSERT INTO users(firstname,lastname,email,password,username) VALUES (?,?,?,?,?)");

            //HASH THE PASSWORD WIHT SALT
            $salt = "sdyuiowk!%$@70sac0a--mLQWQIO";
            $password = sha1($data->password);
            $saltedPassword = $password.$salt;

            $stmt->execute(array($data->firstname,$data->lastname,$data->email,$saltedPassword,$data->username));

            if($stmt->errorInfo()[1] == null){
                //Registration successfull
                return true;
            }else{
                return false;
            }
    }
}