<?php
header('Access-Control-Allow-Origin: *');
require_once ("./QuestionLoader.php");

if(isset($_POST["answer"])){

    $answer = json_decode($_POST["answer"]);
    $Loader = new QuestionLoader();
    $result = $Loader->addAnswerToQuestion($answer);
    echo json_encode(array("success" => true));

}else{

    echo json_encode(array("success" => false));
}

?>