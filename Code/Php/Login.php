<?php

header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require_once ('./LoginClass.php');
$Login = new LoginClass();

$result = $Login->getUserLogin();
if($result != null){
    //Return user details and success status that the login was successful
    echo json_encode(array("success" => true, "user"=> $result));
}else{
    //Login was not successful
    echo json_encode(array("success" => false, "user" => $result));
}
?>