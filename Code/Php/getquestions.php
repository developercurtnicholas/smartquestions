<?php
header('Access-Control-Allow-Origin: *');
//Fetch questions  from the database
require_once ("./QuestionLoader.php");

$Loader = new QuestionLoader();
if(isset($_POST["foranswers"])){

    $results = $Loader->getQuestionAnswers($_POST["question_id"]);
    echo json_encode($results);
    die();

}else if($_POST["fortags"]){

    echo json_encode($Loader->getQuestionTags($_POST["question_id"]));
    die();
}
else if($_POST["delete"]){

    echo json_encode( array("success" => $Loader->deleteQuestion($_POST["question_id"])));
    die();

}else if(isset($_POST["upanswer"])){

    $results = $Loader->upAnswer($_POST["answer_id"]);
    check($results);


}else if(isset($_POST["downanswer"])){

    $results = $Loader->downAnswer($_POST["answer_id"]);
    check($results);

}else if(isset($_POST["upquestion"])){

    $results = $Loader->upQuestion($_POST["question_id"]);
    check($results);

}else if(isset($_POST["downquestion"])){

    $results = $Loader->downQuestion($_POST["question_id"]);
    check($results);
}
else if(isset($_POST["question_id"])){

    $results = $Loader->getSpecificQuestion($_POST["question_id"]);
    echo json_encode($results);
    die();
}else if(isset($_POST["user_id"])){

    echo json_encode($Loader->getUserQuestions($_POST["user_id"]));
    die();
}

function check($results){
    if($results){

        echo json_encode(array("success" => true));
    }else{
        echo json_encode(array("success" => false));
    }
    die();
}



?>