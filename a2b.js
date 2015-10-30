(function () {
	$.ajax({
		url:"http://a2b.zolome.com:8822/v1/merchants",
		method:'GET',
		success: function (data) {
			for (var i = 0; i < data.merchants.length; i++) {
				$('#merchant-id-dropdown').append("<option value="+i+">"+data.merchants[i].merchantName+"</option>");
			}
		
			$.ajax({
			    url: "http://a2b.zolome.com:8822/v1/show_hide_atob_button",
			    method: 'GET',
			    success: function (res) {
			    	if (res.status) {
						var str = '';
						var obj = $('.A2B-button').data();

						for( var name in obj ) {
						    str += (name + '=' + obj[name] + '&');
						}

						str = str.slice(0,-1);
						$('#a2b-button-continer').append("<div style='text-align:center;'><button disabled='disabled' class='pay-using-A2B' style='cursor: pointer;background-color: #C5C5C5;border: none;color: #fff;padding: 10px 20px;margin-top: 10px;'>Pay with A2B</button></div>");

						$('.pay-using-A2B').click(function(){
							if ($('#amount').val() != '' && $('#merchant-name').val() != '') {
								// if ($('#amount').val() > 6000) {
								// 	console.log('in');
								// 	$('.error-amount').css('display', 'block');
								// } else {
									$('#iframeA2B').remove();
									var selectedMerchant = data.merchants[$('#merchant-id-dropdown').val()];
									str = str+'&amount='+$('#amount').val()+'&merchant_name='+selectedMerchant.merchantName+'&merchant_secret='+btoa(selectedMerchant.secretKey)+'&merchant_id='+btoa(selectedMerchant.id);
									if ($('#iframeA2B').length == 0) {
										$('#a2b-iframe-continer').append("<div id='iframeA2B' style='display:none;background-color:rgba(0,0,0,0.4);position:absolute;top:0px;left:0px;width:100%;height:"+$(window).height()+"px;'>"+
											"<div style='width:80%;min-width:300px;max-width:600px;margin:50px auto 0px;position:relative;border-radius:8px;box-shadow: 3px 11px 25px 2px;overflow:hidden;'>"+
												"<div style='display:block; position: absolute; width:100%; text-align: center; top: 35%;'><img src='loading.gif' style='width:80px;' id='loading-iframe'></div>"+
												"<iframe id='A2B-iframe' frameBorder='0' allowtransparency=true onload='setFrameLoaded()' style='display: block;height: 500px;width: 600px;border-radious:10px;box-shadow:none;border:none;' src='http://a2b.zolome.com/#/?"+str+"'></iframe>"+
												"<img class='close-A2B' src='' alt='X' style='cursor:pointer;position:absolute;top:10px;right:10px;'>"+
											"</div>"+
										"</div>");

										$('.close-A2B').click(function(){
											$('#iframeA2B').css("display", "none");
										});

										window.setFrameLoaded = function (argument) {
											$("#loading-iframe").css('display', 'none');
										};
									}

									$('#iframeA2B').css("display", "block");
									$('.token').remove();
								// }
							}
						});

						$('#amount').keyup(function () {
							if ($('#amount').val() > 0){
								$('.pay-using-A2B').removeAttr('disabled').css('background-color', '#53A3CD')
							} else {
								$('.pay-using-A2B').attr('disabled','disabled').css('background-color', '#C5C5C5');
							}
						})
			    	}
			    }, 
			    error: function (error) {
			    	console.log(error);
			    }
			});
		},
		error: function (err) {
			console.log(err);
		}
	})
	
})();