<?php

class SecurePage {

  function __construct () {

  }

  function isValid () {
    return true;
  }

  function id () {
    return 1;
  }

}

class LoginPage {

  function __construct () {

  }

}


function verify () {
  include 'PassanovaAPI/db.php';
  include 'PassanovaAPI/config.php';

  $hash3 = $_GET['hash3'];
  $RQR   = $_GET['RQR'];

  $DB = new DatabaseConnection();

  $stmt = $DB->pdo->prepare("SELECT userID FROM verificationRequests WHERE RQR = ?");
  $stmt->bindValue(1, $RQR, PDO::PARAM_STR);
  $stmt->execute();
  $userid = $stmt->fetchColumn();

  // Yes I know I can do this in a join BUT FUCK I"M RUNNING OUT OF TIME, FUCK
  $stmt = $DB->pdo->prepare("SELECT secret FROM secrets WHERE userID = ?");
  $stmt->bindValue(1, $userid, PDO::PARAM_INT);
  $stmt->execute();
  $secret = $stmt->fetchColumn();

  $generated = md5($config['PrivateToken'] . $config['PublicToken'] . $secret);

  if ($hash3 == $generated) {
    header("Location: secure.php");
  } else {
    header("Location: 404.php"); // TODO: this
  }

}

function generateQRCode() {
  include 'qr.php';
}

?>