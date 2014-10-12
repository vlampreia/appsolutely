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

<h1>My Secure Area</h1>
Hello, <?=$firstname?>!