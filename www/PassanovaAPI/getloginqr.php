<?php

  include 'header.inc.php';
  include 'qrfactory.php';

  // TODO: Validate this.
  $email = $_GET['email'];

  $secret = getUserSecret($email);
  $userid = getUserID($email);

  $RQR = substr(hash('sha256', time() + 'salttobechangedrandomlyhere'), 0, 32);

  $code = '0|' . md5($config['PrivateToken'] .  $config['PublicToken']) . '|' . $secret . '|' . $RQR;

  $DB = new DatabaseConnection();

  $stmt = $DB->pdo->prepare("INSERT INTO verificationRequests (userID, RQR) VALUES (:uid, :rqr)");
  $stmt->execute(array(':uid' => $userid, ':rqr' => $RQR));

  generateQRCode($code, $RQR);
  
  header('Content-Type: application/json');

  echo json_encode(array('success' => 'true', 'RQR' => $RQR));

?>