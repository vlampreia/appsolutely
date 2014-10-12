<?php

  include 'header.inc.php';
  include 'qrfactory.php';

  // TODO: Validate this.
  $code = $_GET['regcode'];

  $RQR = substr(hash('sha256', time() + 'salttobechangedrandomlyhere'), 0, 32);

  generateQRCode($code, $RQR);
  
  header('Content-Type: application/json');

  echo json_encode(array('success' => 'true', 'RQR' => $RQR));

?>