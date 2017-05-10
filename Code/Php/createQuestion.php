<?php
header('Access-Control-Allow-Origin: *');
require_once ("./QuestionCreator.php");
if(isset($_POST["question"])){

    $question = json_decode($_POST["question"]);
    $Creator = new QuestionCreator();

    if(isset($_POST["update"])){

        if($Creator->updateQuestion($question)){
            echo json_encode(array("success" => true));
        }else{
            echo json_encode(array("success"=>false));
        }

    }else{
        if($Creator->creatQuestion($question)){
            echo json_encode(array("success" => true));
        }else{
            echo json_encode(array("success"=>false));
        }
    }
}else{
    echo json_encode("not set");
}


?>