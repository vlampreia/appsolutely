<?php

  include 'header.inc.php';
  include 'qrfactory.php';

  // TODO: Validate this.
  $email = $_GET['email'];

  $secret = getUserSecret($email);

  $RQR = substr(hash('sha256', time() + 'salttobechangedrandomlyhere'), 0, 32);

  $code = '0|' . md5($config['PublicToken'] .  $config['PrivateToken']) . '|' . $secret . '|' . $RQR;

  generateQRCode($code, $RQR);
  
  header('Content-Type: application/json');

  echo json_encode(array('success' => 'true', 'RQR' => $RQR));

?>