(function (jQuery) {
	var $        = jQuery;
	var $wrapper = $("#pass-login");

	var activeView = null;
	var mainForm   = '<div id="login-screen" style=""><div id="logo-wrapper"><img src="img/logo.png" alt="" /></div><h1 style="font-weight: normal;"><small>Login With</small> neopass </h1><h1><form><input id="passEmailInput" placeholder="Your Email"><button id="loginButton" class="button login active">Login</button></form><div id="extra"> <a href="#" class="signup">Create an account</a></div></div>';
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
      var email = $("#passEmailInput").val();

  		activeView.addClass('animate-top');

  		setTimeout(function() {
  			activeView.empty();

  			var $secondView = $(qrView);

  			activeView = $secondView;
  			$wrapper.append($secondView);

        requestLoginQR(email);

  		},700);

  	}


    function requestLoginQR(email) {
      var baseURL = "http://login.io/PassanovaAPI/getloginqr.php?email=" + email;
      $.get( baseURL, function( data ) {

        checkLoginAuth(data.RQR);
        showQr(data.RQR);
      });
    }

    function requestRegQR(regcode) {
      var baseURL = "http://login.io/PassanovaAPI/getregqr.php?code=" + regcode;
      $.get( baseURL, function( data ) {

        checkReg(regcode);
        showQr(data.RQR);
      });
    }









    function checkReg(_regcode_) {

      var baseURL = "http://transitivepylons.no-ip.biz/isRegistered"
      $.post( baseURL , { regcode: _regcode_ } ).done(function(data) {
        if(!data) {
          setTimeout(function() {
            checkReg(_regcode_);
          }, 1500);
        } else {
          console.log(data);
        }
        console.log("Bitchez from Victor", data);
        if (data == "success") {
          activeView.empty();

          var msg = "<h2>Success!</h2><p>You will shortly be redirected in <span id=\"num\">4</span> seconds...</p>";

          activeView.append(msg);

          var countdown = 4;

          setInterval(function () {
            if (countdown == 0) return ;
            else countdown--;
            document.getElementById("num").innerHTML = countdown;
          }, 1000);

          setTimeout(function () {
            window.location = "index.php";
          }, 4000)
        }

      });

    }




    function doReg(event) {
      alert('yo')
      activeView.addClass('animate-top');
      setTimeout(function() {
        activeView.empty();

        var $secondView = $(qrView);

        activeView = $secondView;
        $wrapper.append($secondView);

        requestRegQR(document.getElementById("regcode"));

      },700);

    }










    function checkLoginAuth(RQR) {

      var baseURL = "http://transitivepylons.no-ip.biz/isAuthenticated"
      $.post( baseURL , { rqr: RQR } ).done(function(data) {
        if(!data) {
          setTimeout(function() {
            checkLoginAuth(RQR);
          }, 1500);
        } else {
          console.log(data);
        }
        console.log("Bitchez from Victor", data);
        if (data.hash3) {
          activeView.empty();

          var msg = "<h2>Success!</h2><p>You will shortly be redirected in <span id=\"num\">4</span> seconds...</p>";

          activeView.append(msg);

          var countdown = 4;

          setInterval(function () {
            if (countdown == 0) return ;
            else countdown--;
            document.getElementById("num").innerHTML = countdown;
          }, 1000);

          setTimeout(function () {
            window.location = "verify.php?hash3=" + data.hash3 + "&RQR=" + RQR;
          }, 4000)
        }

      });

    }


  	function showQr(shityShity) {
  		activeView.empty();

      var baseURL = "http://login.io/PassanovaAPI/qrs/" + shityShity + ".png"

  		var qrTemplate = '<div id="logo-wrapper" class="last-step"><img src="img/logo.png" alt="" /></div>';
  		var img 	   = '<img src="' + baseURL + '" />';
  		
  		qrTemplate	   = qrTemplate +  img;

  		qrTemplate 	   += '<p class="help">To finish, please scan the QR code using neopass.</p>'

  		activeView.append(qrTemplate);
  	}



})(jQuery)