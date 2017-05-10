<?php
require_once ('./DBCONNECT.php');
class QuestionLoader{

    private $con;

    //Connnect to the database
    function __construct(){
        $this->con = DBCONNECT::CONNECT();
    }

    //Nullify connection
    function __destruct()
    {
       $this->con = null;
    }

    //Get All the questions in the databsase
    public function getAllQuestions(){

        $stmt = $this->con->prepare("SELECT * FROM questions,users WHERE questions.user_id = users.user_id
          ORDER BY questions.time DESC");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    //Get The answers associated with a specific question
    public function getQuestionAnswers($question_id){

        $stmt = $this->con->prepare("
SELECT * 
FROM answer
WHERE answer.question_id = ?
ORDER BY answer.upvotes DESC ");
        $stmt->execute(array($question_id));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;

    }

    //Load a specific question by id
    public function getSpecificQuestion($question_id){

        $stmt = $this->con->prepare("SELECT * FROM questions WHERE question_id = ?");
        $stmt2 = $this->con->prepare("UPDATE questions SET views = views + 1 WHERE question_id = ?");
        $stmt2->execute(array($question_id));
        $stmt->execute(array($question_id));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
    }

    //Adds answer to the specified question
    public function addAnswerToQuestion($answer){

        $stmt = $this->con->prepare("INSERT INTO answer(user_id,question_id,upvotes,answer,user) VALUES(?,?,?,?,?)");
        $stmt2 = $this->con->prepare("UPDATE questions SET answercount = answercount + 1 WHERE question_id = ?");
        $stmt2->execute(array($answer->question_id));
        $stmt->execute(array($answer->user_id,$answer->question_id,$answer->upvotes,$answer->answer,$answer->user));
        if($stmt->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }

    //Upvote an answer
    public function upAnswer($answer_id){

        $stmt = $this->con->prepare("UPDATE answer SET upvotes = upvotes + 1 WHERE answer_id = ?");
        $stmt->execute(array($answer_id));

        if($stmt->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }

    //Down vote an answer
    public function downAnswer($answer_id){

        $stmt = $this->con->prepare("UPDATE answer SET upvotes = upvotes - 1 WHERE answer_id = ?");
        $stmt->execute(array($answer_id));

        if($stmt->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }

    //Upvote a question
    public function upQuestion($question_id){

        $stmt = $this->con->prepare("UPDATE questions SET votes = votes + 1 WHERE question_id = ?");
        $stmt->execute(array($question_id));

        if($stmt->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }

    public function getQuestionTags($question_id){

        $stmt = $this->con->prepare("SELECT * FROM tags WHERE question_id = ?");
        $stmt->execute(array($question_id));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;

    }


    public function getQuestionsByTag($tag){

        $stmt = $this->con->prepare("
                                        SELECT DISTINCT 
                                        questions.answercount, 
                                        questions.category, 
                                        questions.description,
                                        questions.question_id, 
                                        questions.subject, 
                                        questions.tags, 
                                        questions.time, 
                                        questions.user_id, 
                                        questions.views,
                                        questions.votes
                                        FROM questions,tag
                                        WHERE 
                                        (questions.question_id = tag.question_id AND tag.name LIKE ? ) OR 
                                        (questions.question_id = tag.question_id AND questions.subject LIKE ? ) OR 
										(questions.question_id = tag.question_id AND questions.description LIKE ?)
                                        ORDER BY questions.time DESC
                                    ");
        $stmt->execute(array('%'.$tag.'%',  '%'.$tag.'%', '%'.$tag.'%'));
        //echo $stmt->queryString;
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    //DownVote a question
    public function downQuestion($question_id){

        $stmt = $this->con->prepare("UPDATE questions SET votes = votes - 1 WHERE question_id = ?");
        $stmt->execute(array($question_id));

        if($stmt->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }
    //Delete a question
    public function deleteQuestion($question_id){

        $deleteTags = "DELETE FROM tag WHERE question_id = ?";
        $deleteAnswers = "DELETE FROM answer WHERE question_id = ?";
        $deleteQuestion = "DELETE FROM questions WHERE question_id = ?";

        $stmt = $this->con->prepare($deleteTags);
        $stm2 = $this->con->prepare($deleteAnswers);
        $stmt3 = $this->con->prepare($deleteQuestion);

        $stmt->execute(array($question_id));
        $stm2->execute(array($question_id));
        $stmt3->execute(array($question_id));

        if($stmt3->errorInfo()[1] == null){
            return true;
        }else{
            return false;
        }
    }

    //Get questions for a specific user
    public function getUserQuestions($user_id){

        $stmt = $this->con->prepare("SELECT * FROM questions WHERE user_id = ? ORDER BY questions.time DESC");
        $stmt->execute(array($user_id));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}