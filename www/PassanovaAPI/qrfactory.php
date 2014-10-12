<?php

function generateQRCode ($qrcode, $rqr) {

    //set it to writable location, a place for temp generated PNG files
  $PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
  
  //html PNG location prefix

  include "phpqrcode/qrlib.php";

  QRcode::png($qrcode, 'qrs/' . $rqr . '.png', 'Q', 6, 2);    

}


?>