<?php
header('Access-Control-Allow-Origin: *');
require_once ("QuestionLoader.php");
if(isset($_POST["query"]) && isset($_POST["tag"])){
    $Loader = new QuestionLoader();
    //Search by tag
    if($_POST["tag"] == "true"){
        echo json_encode($Loader->getQuestionsByTag($_POST["query"]));
    }else if($_POST["tag"] == "false"){
        //Serach by description/title
    }

}

?>