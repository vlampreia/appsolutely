<?php
try {
	$app = require_once __DIR__.'/../app/app.php';
	$app->run();
	
} catch(Exception $exception) {
	echo $exception;
}

?>