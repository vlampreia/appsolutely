<?php

  include 'db.php';
  $DB = new DatabaseConnection();

  if (isset($_POST['sent'])) {
    $email = $_POST['email'];
    $first = $_POST['firstname'];
    $last  = $_POST['lastname'];
  
    $regcode = md5(time() + "sdfdsf");

    $stmt = $DB->pdo->prepare("INSERT INTO users (email, firstname, lastname) VALUES (:email, :first, :last)");
    $stmt->execute(array(':email' => $email, ':first' => $first, ':last' => $last));

    header("Location: register.php?regcode=" . $regcode);

  }
  // } else if (isset($_GET['regcode'])) {
  //   $regcode = $_GET['regcode'];

    
  // }





  // $stmt = $DB->pdo->prepare("INSERT INTO verificationRequests (userID, RQR) VALUES (:uid, :rqr)");
  // $stmt->execute(array(':uid' => $userid, ':rqr' => $RQR));

  // generateQRCode($code, $RQR);
  
  // header('Content-Type: application/json');

  // echo json_encode(array('success' => 'true', 'RQR' => $RQR));

?>

<h1>Register to Mark's Super Website</h1>

<? if ((!isset($_POST['sent'])) && (!isset($_GET['regcode']))) : ?>

<form action="" method="POST">

<p>Email</p>
<input type="email" name="email">

<p>First Name</p>
<input type="text" name="firstname">

<p>Last Name</p>
<input type="text" name="lastname">
<br /><br />
<input type="submit" name="sent" value="Continue to Next Step of Registration">
</form>

<? endif; ?>

<? if (isset($_GET['regcode'])) : ?>

<div id="pass-login">

</div>



<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="/js/paas.js">
  doReg(e);
</script>


<? endif; ?>