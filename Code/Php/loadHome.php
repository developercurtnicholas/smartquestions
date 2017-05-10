<?php
header('Access-Control-Allow-Origin: *');
require_once ("./LoadHomeData.php");
if(isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["user_id"])){
    $homeLoader = new LoadHomeData($_POST["user_id"]);
    echo json_encode($homeLoader->loadHome());
}else{
    echo json_encode(array("success" => false));
}
?>