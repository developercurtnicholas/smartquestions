<?php
require_once ("./DBCONNECT.php");
class LoginClass
{
    private $con;
    private $email;
    private $password;

    function __construct()
    {
        $this->con = DBCONNECT::CONNECT();
    }

    function __destruct()
    {
        $this->con = null;
    }

    function getUserLogin(){

        if($this->checkPost()){
            $stmt = $this->con->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
            $stmt->execute(array($this->email,$this->password));

            //Return the row with the user details
            if($stmt->errorInfo()[1] == null){
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result;
            }else{
                //Fail
                return null;
            }

        }else{
            //Fail
            return null;
        }
    }
    private function checkPost(){
        if(isset($_POST["email"]) && isset($_POST["password"]) ){

            $this->email = $_POST["email"];

            $salt = "sdyuiowk!%$@70sac0a--mLQWQIO";
            $password = sha1($_POST["password"]);

            $this->password = $password.$salt;

            return true;
        }else{
            //Fail
            return false;
        }
    }
}