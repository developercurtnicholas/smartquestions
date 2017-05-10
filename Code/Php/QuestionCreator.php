<?php

require_once ("./DBCONNECT.php");
class QuestionCreator
{
    private $con;
    private $subject;
    private $description;
    private $user_id;
    private $answer_id;
    private $last;
    private $tags = array();

    function __construct()
    {
        $this->con = DBCONNECT::CONNECT();
    }

    function __destruct()
    {
        $this->con = null;
    }

    function creatQuestion($question){

        //Insert each tag for the question
        $tagString = "";
        foreach($question->tagsArray as $tag){

            $tagString.=$tag->name." , ";
        }

        $stmt = $this->con->prepare("INSERT INTO questions(subject,description,user_id,votes,tags) VALUES(?,?,?,?,?)");
        $stmt->execute(array(
            $question->subject,
            $question->description,
            $question->user_id,
            $question->votes,
            $tagString
        ));

        //Get the question just inserted
        $question_id = $this->con->lastInsertId();

        //Insert each tag
        $this->createTags($question_id,$question->tagsArray);

        //Question Created
        if($stmt->errorInfo()[1] == null){
            return true;

        }else{
            return false;
        }
    }

    function updateQuestion($question){

        $tagString = "";
        foreach($question->tagsArray as $tag){

            $tagString.=$tag->name." , ";
        }

        $stmt = $this->con->prepare("UPDATE questions SET subject = ?,description = ?,user_id = ?,votes = ?,tags = ? WHERE question_id = ?");
        $stmt->execute(array(
            $question->subject,
            $question->description,
            $question->user_id,
            $question->votes,
            $tagString,
            $question->question_id,
        ));

        $this->updateTags($question->question_id,$question->tagsArray);

        //Question Created
        if($stmt->errorInfo()[1] == null){

            return true;

        }else{
            return false;
        }
    }

    ///To update tags we need to recreate them so delete them them ceate
    //delete tags
    private function updateTags($question_id,$tags){

        $stmt = $this->con->prepare("DELETE FROM tag WHERE question_id = ?");
        $stmt->execute(array($question_id));

        $this->createTags($question_id,$tags);


    }

    private function createTags($question_id,$tags){

        $stmt = $this->con->prepare("INSERT INTO tag(name,question_id) VALUES(?,?)");
        //Insert each tag for the question
        foreach($tags as $tag){
            $stmt->execute(array($tag->name,$question_id));
        }


        if($stmt->errorInfo()[1] == null){

            return true;

        }else{
            echo $stmt->errorInfo();
            die();
            return false;
        }
    }
}