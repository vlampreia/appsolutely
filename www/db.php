<?php

  class DatabaseConnection {

    private $host     = 'localhost';
    private $database = 'battlehack';
    private $username = 'battlehack';
    private $password = '2014';
    public  $salt     = 'ab43cb10d256cee2922621b1eba37d15';
    public  $pdo;

    function __construct() {

      $this->pdo = new PDO("mysql:host=$this->host;" .
                          "dbname=$this->database;" .
                          "port:3307;" .
                          'charset=utf8',
                          $this->username,
                          $this->password);

    }

  }

?>