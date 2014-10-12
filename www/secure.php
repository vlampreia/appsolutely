<?php

  // Include Passanova SDK
  require('Passanova.php');
  $user = new SecurePage();

  if (!$user->isValid()) {
    die('You are not welcome!');
  }


  // Include my database settings...
  include 'db.php';
  $DB = new DatabaseConnection();


  // Lookup user...
  $stmt = $DB->pdo->prepare("SELECT firstname FROM users WHERE id = ?");
  $stmt->bindValue(1, $user->id(), PDO::PARAM_INT);
  $stmt->execute();

  $firstname = $stmt->fetchColumn();

?>
<html>
<head>
  <title>My Secure Area...</title>
  <link rel="stylesheet" type="text/css" href="/css/global.css">
  <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Secure Mark (@MagicMark)</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>

<div class="container" style="margin-top:60px">
  <div class="page-header">
    <h1>My Secure Area <small>  Hello, <b><?=$firstname?></b>! Thanks for logging in :) </small> </h1>
  </div>  
    
  <div class="row">
    <img id="funnyPic" src="/img/face.png" alt="">
  </div>
  <button class="btn btn-success"> Logout </button>   
</div>

</body>
</html>
