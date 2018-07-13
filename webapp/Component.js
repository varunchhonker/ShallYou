sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"ShallYou/model/models"

], function(UIComponent, Device, JSONModel, models) {
	"use strict";

	return UIComponent.extend("ShallYou.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			//jQuery.sap.require("ShallYou.js.service");

			this.setModel(new JSONModel({
				modulePath: jQuery.sap.getModulePath("ShallYou"),
				firstTime: true,
				failedAttempts: 0,
				possibleAttempts: 9,
				usedCharacters: ""
			}).setDefaultBindingMode("OneWay"), "global");
			// set the device model
			//	var sRootPath =jQuery.sap.getModulePath("ShallYou.images");
			this.setModel(models.createDeviceModel(), "device");
			
		}
	});
});