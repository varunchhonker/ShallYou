sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createModulePathModel: function() {
			var modulePath = $.sap.getModulePath("TestApp");
			var oModel = new JSONModel({
				"path": modulePath
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	};
});