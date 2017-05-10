<?php
header('Access-Control-Allow-Origin: *');
require_once ("./RegisterClass.php");
if(isset($_POST["data"])){

    $register = new RegisterClass();
    if($register->registerUser(json_decode($_POST["data"]))){
        echo json_encode(array("success"=> true));
    }else{
        echo json_encode(array("success"=> false));
    }
}
?>