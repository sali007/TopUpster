var requestHandler  = {

	urls : {
		topUp : "https://api.qiwi.com/xml/topup.jsp",
		transit : "https://api.qiwi.com/xml/xmlcp.jsp"
	},

	RequestTemplate: {

		getProviderByPhone: function (data) {
			return '<?xml version="1.0" encoding="utf-8"?>' +
				'<request>' +
				'<request-type>get-provider-by-phone-number</request-type>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<extra name="password">' + auth.password +'</extra>' +
				'<phonenumber>' + data.phone + '</phonenumber>' +
				'</request>';
		},

		pay: function (data) {
			return'<?xml version="1.0" encoding="utf-8"?>' +
				'<request>' +
				'<request-type>pay</request-type>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<extra name="password">' + auth.password + '</extra>' +
				'<auth>' +
				'<payment>' +
				'<transaction-number>' + settings.getTransactionNumber() + '</transaction-number>' +
				'<from>' +
				'<ccy>RUB</ccy>' +
				'</from>' +
				'<to>' +
				'<amount>' + data.amount + '</amount>' +
				'<ccy>RUB</ccy>' +
				'<service-id>99</service-id>' +
				'<account-number>' + data.phone + '</account-number>' +
				'<extra name="account0">id:' + data.prvId +';acc:' + data.account + ';sum:' + data.amount + '</extra>' +
				'</to>' +
				'</payment>' +
				'</auth>' +
				'</request>';
		},

		checkUser: function (data) {
			return '<?xml version="1.0" encoding="utf-8"?>' +
				'<request>' +
				'<request-type>check-user</request-type>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<extra name="password">' + auth.password + '</extra>' +
				'<extra name="phone">' + data.phone + '</extra>' +
				'<extra name="ccy">RUB</extra>' +
				'</request>';
		},

		pwdChange: function (data) {
			return '<?xml version="1.0" encoding="utf-8"?>' +
				'<request>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<request-type>pwd-change</request-type>' +
				'<extra name="password">' + auth.password + '</extra>' +
				'<extra name="new_password">' + data.pwd + '</extra>' +
				'</request>';
		},

		checkPaymentStatus: function (data) {
			return '<?xml version="1.0" encoding="utf-8"?>' +
				'<request>' +
				'<request-type>pay</request-type>' +
				'<extra name="password">' + auth.password + '</extra>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<status>' +
				'<payment>' +
				'<transaction-number>' + data.txn + '</transaction-number>' +
				'<to>' +
				'<account-number>' + data.phone + '</account-number>' +
				'</to>' +
				'</payment>' +
				'</status>' +
				'</request>';
		},

		getBalance: function (data) {
			return '<request>' +
				'<request-type>ping</request-type>' +
				'<terminal-id>' + auth.login + '</terminal-id>' +
				'<extra name="password">' + auth.password + '</extra>' +
				'</request>';

		}
	},

	processRequest: function (url, data, reqType) {

		var url, data;
		if (reqType == "getBalance") {
		url = requestHandler.urls.topUp;
		data = requestHandler.RequestTemplate[reqType]();
			requestHandler.loader(1)
	    }

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			return;
		}

		request.onreadystatechange = function () {
			switch (request.readyState) {
				case 1:
					//requestHandler.logHelper("<br/>1: Preparing request...");
					break
				case 2:
					//requestHandler.logHelper("<br/>2: Sended...");
					break
				case 3:
					//requestHandler.logHelper("<br/>3: Processing...");
					break
				case 4:
				{
					if (request.status == 200) {
						if(request.responseXML.getElementsByTagName('result-code')[0].childNodes[0].nodeValue == 0 ) {
							//requestHandler.logHelper("</br>4: Processed.");
							if(reqType == "getProviderByPhone") {
								logHelpers.logHelper("<h3>Operation result</h3>" + "Provider: " + request.responseXML.getElementsByTagName("provider")[0].getAttribute("id"))
							}
							if(reqType == "checkUser") {
								logHelpers.responseParser("<h3>Operation result</h3>" + "Client exist (" + request.responseXML.getElementsByTagName("exist")[0].childNodes[0].nodeValue + ")");
							}
							if(reqType == "checkPaymentStatus") {
								logHelpers.responseParser("<h3>Operation result</h3>" + "Transaction: " + request.responseXML.getElementsByTagName("payment")[0].getAttribute("txn_id") +
								                              "</br>PaymentStatus: " + request.responseXML.getElementsByTagName("payment")[0].getAttribute("status") +
								                              "</br>Payment result-code: " + request.responseXML.getElementsByTagName("payment")[0].getAttribute("result-code") +
								                              "</br>Txn Date: " + request.responseXML.getElementsByTagName("payment")[0].getAttribute("txn-date"));
							}
							if(reqType == "getBalance") {
								logHelpers.responseParser("balance: " + request.responseXML.getElementsByTagName("balance")[0].childNodes[0].nodeValue, reqType);
								requestHandler.loader(0);
								break;
							}
						}
						logHelpers.logHelper("</br><b><em>Response message:</em> " +
						request.responseXML.getElementsByTagName('result-code')[0].getAttribute("msg") + "</br><em>Result-code:</em> " +
						request.responseXML.getElementsByTagName('result-code')[0].childNodes[0].nodeValue + "</b>");

					} else if (request.status == 404) {
						alert("Error: Requested url not found!");
					}
					else alert("Error: server return ");
					//break
				}
			}
		}
		request.open('POST', url, false);
		request.setRequestHeader('ContentType', 'text/xml');
		//request.setRequestHeader('Access-Control-Allow-Origin', '*')
		request.send(data);
	},

	attachEvent : function(formType) {

		document.getElementById(formType).addEventListener('click', function(e) {
			if(formType == "pay") {
				requestHandler.loader(1);
				requestHandler.paymentHelper(
					formHelpers.parseformData(formType),
					formType);
				requestHandler.loader(0);
				return;
			}
			else if(formType == "settingsForm") {
				requestHandler.loader(1);
				var d = formHelpers.parseformData(formType)
				settings.setTransactionNumber(d.lastTxn);
				settings.setTimeout(d.timeout)
				requestHandler.loader(0);
				return;
			}
			else {
				requestHandler.loader(1);
				requestHandler.processRequest(requestHandler.urls.topUp,
					requestHandler.RequestTemplate[formType](formHelpers.parseformData(formType)),
					formType);
				requestHandler.loader(0);
				return;
			}
		});
	},

	paymentHelper : function(data, reqType) {
		var phones = document.getElementById('store').innerText.split('\n'),
			url;
		//alert(phones)
		if(data.amount == 0) {
			logHelpers.logHelper("</br>Parameter Amount is not filled")
			return;
		}
		if(data.tries == 0) {
			logHelpers.logHelper("</br>Parameter Tries is not filled")
			return;
		}
		if(data.account == 0 && data.trans == true) {
			logHelpers.logHelper("</br>Parameter Account is not filled")
			return;
		}
		if(data.prvId == 0 && data.trans == true) {
			logHelpers.logHelper("</br>Parameter Service ID is not filled")
			return;
		}
		data.trans == true ?
			url = requestHandler.urls.transit :
			url = requestHandler.urls.topUp;
			for (var y = 0; y < phones.length; y++) {
				if(phones[y].length == 11) {
					for (i = 0; i < parseInt(data.tries); i++) {
						data.phone = phones[y];
						var  req = requestHandler.RequestTemplate[reqType](data);
						setTimeout(requestHandler.processRequest, requestHandler.getTimeout , url, req, reqType);
					}
				} else {
					logHelpers.logHelper("</br>Phone consist of 11 digits!")
				}
		}

	},

	loader : function(status) {
		if (status == 1) {
			document.getElementById('loading').style.display = 'block';
			document.getElementById("loader").src = "./../images/loading.gif";
			return;
		}
		if (status == 0) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById("loader").src = "./../images/loadingSingle.gif";
			return;
		}
	}
}





