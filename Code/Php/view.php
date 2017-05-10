<?php
/**
 * Created by PhpStorm.
 * User: Kurt
 * Date: 5/9/2017
 * Time: 11:01 AM
 */
session_start();
if(isset($_SESSION["user_id"])){
    echo "set";
}else{
    echo "not set";
}

?>