<?php

class DBCONNECT{

    private static $DB_SERVER = "topnhotch.com";
    private static $DB_DATABASE = "smartoverflow";
    private static $DB_USER = "smartoverflow";
    private static $DB_PASSWORD = "smartoverflow";

    public static function CONNECT(){
        $con = new PDO(
            "mysql:host=".DBCONNECT::$DB_SERVER.";". "dbname=".DBCONNECT::$DB_DATABASE."",
            DBCONNECT::$DB_USER,
            DBCONNECT::$DB_PASSWORD);
        return $con;
    }
}