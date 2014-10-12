<?php
  include 'db.php';
  include 'config.php';

  function getUserSecret($email) {

    $DB = new DatabaseConnection();

    $stmt = $DB->pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bindValue(1, $email, PDO::PARAM_STR);
    $stmt->execute();
    $id = $stmt->fetchColumn();

    // Yes I know I can do this in a join BUT FUCK I"M RUNNING OUT OF TIME, FUCK
    $stmt = $DB->pdo->prepare("SELECT secret FROM secrets WHERE userID = ?");
    $stmt->bindValue(1, $id, PDO::PARAM_INT);
    $stmt->execute();
    $secret = $stmt->fetchColumn();

    return $secret;

  }

  function getUserID($email) {

    $DB = new DatabaseConnection();

    $stmt = $DB->pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bindValue(1, $email, PDO::PARAM_STR);
    $stmt->execute();
    $id = $stmt->fetchColumn();

    return $id;

  }


?>