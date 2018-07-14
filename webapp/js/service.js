jQuery.sap.declare('ShallYou.js.service');

//baseURls
//var serverPath = "https://us-central1-shallyou-817e0.cloudfunctions.net";
var serverPath = "/services/";

//----------------------------------URL FOR GET METHODS-------------------------------

var serviceObject = {

	read: function (subPath, params, successCallBack, oController) {
		var oBusyIndicator;
		oBusyIndicator = (oBusyIndicator) ? oBusyIndicator :
			new sap.m.BusyDialog();
		oBusyIndicator.open();
		$.ajax({
			/*headers: {
				'Access-Control-Allow-Origin': 'https://us-central1-shallyou-817e0.cloudfunctions.net'
			},*/
			crossDomain: true,
			url: serverPath + subPath,
			method: "get",
			error: function (e) {
				oBusyIndicator.close();
				sap.m.MessageToast.show(e.message);
				successCallBack.apply(oController, [e, false, params]);

			},
			success: function (data, textStatus, jqXHR) {
				oBusyIndicator.close();
				successCallBack.apply(oController, [data, true, params]);
			}
		});
	},

	readWithoutCallback: function (subPath, params) {
		$.ajax({
			async: true,
			crossDomain: true,
			url: serverPath + subPath,
			method: "get",
			error: function (e) {

			},
			success: function (data, textStatus, jqXHR) {

			}
		});
	}

};