(function (jQuery) {
	var $        = jQuery;
	var $wrapper = $("#pass-login");

	var activeView = null;
	var mainForm   = '<div id="login-screen" style=""><div id="logo-wrapper"><img src="img/logo.png" alt="" /></div><h1 style="font-weight: normal;"><small>Login With</small>neopass </h1><h1><form><input id="passEmailInput" placeholder="Your Email"><button id="loginButton" class="button login active">Login</button></form><div id="extra"> <a href="#" class="signup">Create an account</a></div></div>';
	var qrView     = '<div id="pass-qr"><div id="logo-wrapper" class="animation-spin"><img src="img/logo.png" alt="" /></div><h3>Please wait...</h3></div>'
	
	loadCSS();
	createFristStep();


	function loadCSS() {
		var $ = document;

		var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('link');
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = 'css/paas.css';
	    link.media = 'all';
	    head.appendChild(link);
	}

  	function createFristStep() {
  		$wrapper.empty();
  		var $firstStep    = $(mainForm);

  		activeView   	  = $firstStep; 
  		
  		var $logginButton = $firstStep.find("#loginButton");

  		$logginButton.on('click', loginIn);

  		$wrapper.append($firstStep);
  	}


  	function loginIn(event) {
  		event.preventDefault();
  		activeView.addClass('animate-top');

  		setTimeout(function() {
  			activeView.empty();
  			var $secondView = $(qrView);
  			activeView = $secondView;

  			$wrapper.append($secondView);

  			setTimeout(function() {
  				showQr();
  			},500);

  		},700);

  	}

  	function showQr() {
  		activeView.empty();

  		var qrTemplate = '<div id="logo-wrapper" class="last-step"><img src="img/logo.png" alt="" /></div>';
  		var img 	   = '<img src="http://goqr.me/_Resources/Static/Packages/GoQrMe.Ui/Images/qr_default.png" />';
  		
  		qrTemplate	   = qrTemplate +  img;

  		qrTemplate 	   += '<p class="help">To finish pleases scan the QR code using neopass</p>'

  		activeView.append(qrTemplate);
  	}



})(jQuery)