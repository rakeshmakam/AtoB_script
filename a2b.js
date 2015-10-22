(function () {
	$.ajax({
	    url: "http://localhost:8822/v1/show_hide_atob_button",
	    method: 'GET',
	    success: function(res){
	    	if (res.status) {
				var str = '';
				var obj = $('.A2B-button').data();

				for( var name in obj ) {
				    str += (name + '=' + obj[name] + '&');
				}

				str = str.slice(0,-1);
				$('body').append("<button class='pay-using-A2B'>Pay with A2B</button>"+
					"<div class='iframeA2B' style='display:none;background-color:rgba(0,0,0,0.4);position:absolute;top:0px;left:0px;width:100%;height:"+$(window).height()+"px;'>"+
						"<div style='width:80%;min-width:300px;max-width:600px;margin:50px auto 0px;position:relative;border-radius:8px;box-shadow: 3px 11px 25px 2px;overflow:hidden;'>"+
							"<iframe id='A2B-iframe' style='display: block;height: 600px;width: 600px;border-radious:10px;box-shadow:none;border:none;' src='http://a2b.zolome.com/#/?"+str+"'></iframe>"+
							"<img class='close-A2B' src='' alt='X' style='position:absolute;top:10px;right:10px;'>"+
						"</div>"+
					"</div>");

				$('.pay-using-A2B').click(function(){
					$('.iframeA2B').css("display", "block");
					$('.token').remove();
				});

				$('.close-A2B').click(function(){
					window.closePopup();
				});

				window.closePopup = function (token) {
					$('.iframeA2B').css("display", "none");
					$('.pay-using-A2B').prop('disabled', true);
					if (token) 
						$('.pay-using-A2B').after('<p class=token>Your AtoB token is: <strong>' + token + '</strong></p>');
				}
	    	}
	    }, 
	    error: function (error){
	    	console.log(error);
	    }
	});
	
})();