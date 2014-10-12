<?php 
require 'bootstrap.php';

use Slim\Slim;
use Slim\Views\Twig;

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('dfnhkt5h6ptgbwy2');
Braintree_Configuration::publicKey('rkn7xftfnnx82zjz');
Braintree_Configuration::privateKey('9d3d77c1282517b34e623b8936c47b94');


\Slim\Route::setDefaultConditions(array(
    'id' => '\d+'
));

$app = new Slim(array(
        'debug'          => true,
        'view'           => new Twig(),
        'templates.path' => '../views/'
    ));

$app->container->singleton('db', function () {
    // $db = new PDO( "sqlsrv:Server=192.168.2.3;Database=publications", "sa","123456"); 
    // $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    // $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $db = new stdClass;
    return $db;
});

$app->get('/', function() use ($app) {

    $params = array();
    $app->render('index.html.twig',$params);
});


$app->post('/checkout', function() use ($app) {

    $nonce = $_POST["payment_method_nonce"];
    
    $result = Braintree_Transaction::sale(array(
      'amount' => '10.00',
      'paymentMethodNonce' => $nonce
    ));


    $params = array(
        "name"   => $_POST['first'],
        "second" => $_POST['second'],
        "email"  => $_POST['email'],
        "url"    => $_POST['url']
    );

    $app->render('checkout.html.twig',$params);

});


$app->get('/create', function() use ($app) {

    $clientToken = Braintree_ClientToken::generate();

    $params = array(
        'clientToken' => $clientToken
    );
    
    $app->render('create.html.twig',$params);
});



return $app;

?>