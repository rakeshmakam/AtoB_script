(function () {
	$.ajax({
		url:"http://a2b.zolome.com:8822/v1/merchants",
		method:'GET',
		success: function (data) {
			console.log(data.merchants);
			for (var i = 0; i < data.merchants.length; i++) {
				console.log(data.merchants[i].id);
				$('#merchant-id-dropdown').append("<option value="+i+">"+data.merchants[i].merchantName+"</option>");
			}
		
			$.ajax({
			    url: "http://a2b.zolome.com:8822/v1/show_hide_atob_button",
			    method: 'GET',
			    success: function(res){
			    	if (res.status) {
						var str = '';
						var obj = $('.A2B-button').data();

						for( var name in obj ) {
						    str += (name + '=' + obj[name] + '&');
						}

						str = str.slice(0,-1);
						$('#a2b-button-continer').append("<div style='text-align:center;'><button class='pay-using-A2B' style='cursor: pointer;background-color: #53A3CD;border: none;color: #fff;padding: 10px 20px;margin-top: 10px;'>Pay with A2B</button></div>");

						$('.pay-using-A2B').click(function(){
							if ($('#amount').val() != '' && $('#merchant-name').val() != '') {
								$('#iframeA2B').remove();
								var selectedMerchant = data.merchants[$('#merchant-id-dropdown').val()];
								str = str+'&amount='+$('#amount').val()+'&merchant_name='+selectedMerchant.merchantName+'&merchant_secret='+btoa(selectedMerchant.secretKey)+'&merchant_id='+btoa(selectedMerchant.id);
								if ($('#iframeA2B').length == 0) {
									$('#a2b-iframe-continer').append("<div id='iframeA2B' style='display:none;background-color:rgba(0,0,0,0.4);position:absolute;top:0px;left:0px;width:100%;height:"+$(window).height()+"px;'>"+
										"<div style='width:80%;min-width:300px;max-width:600px;margin:50px auto 0px;position:relative;border-radius:8px;box-shadow: 3px 11px 25px 2px;overflow:hidden;'>"+
											"<iframe id='A2B-iframe' onload='setFrameLoaded()' style='display: block;height: 500px;width: 600px;border-radious:10px;box-shadow:none;border:none;' src='http://a2b.zolome.com/#/?"+str+"'></iframe>"+
											"<img class='close-A2B' src='' alt='X' style='cursor:pointer;position:absolute;top:10px;right:10px;'>"+
										"</div>"+
									"</div>");

									$('.close-A2B').click(function(){
										window.closePopup();
									});

									window.setFrameLoaded = function (argument) {
										console.log("setFrameLoaded");
									};
								}

								$('#iframeA2B').css("display", "block");
								$('.token').remove();
							}
						});
						// function onStorageEvent(storageEvent){

						//     alert("storage event");
						// }

						// window.addEventListener('storage', onStorageEvent, false);

						window.closePopup = function (token) {
							$('#iframeA2B').css("display", "none");
							if (token) {
								$('.pay-using-A2B').prop('disabled', true);
								$('.pay-using-A2B').after('<p class="token" style="margin: 8px;">Paid successfully, Your AtoB charge id is: <strong>' + token + '</strong></p>');
							}
						}
			    	}
			    }, 
			    error: function (error){
			    	console.log(error);
			    }
			});
		},
		error: function (err) {
			console.log(err);
		}
	})
	
})();