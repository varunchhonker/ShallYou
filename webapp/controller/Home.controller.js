sap.ui.define([
	"ShallYou/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ShallYou.view.InitialView
		 */

		onInit: function () {

		},

		onAfterRendering: function () {
			
		},

		onPressPlay: function (oEvent) {
			this.playButtonSound();
			var firstTime = this.getOwnerComponent().getModel("global").getProperty("/firstTime");
			if (firstTime) {
				this.getRouter().navTo("journey");
			} else {
				this.getRouter().navTo("levels");
			}
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ShallYou.view.InitialView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ShallYou.view.InitialView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ShallYou.view.InitialView
		 */
		//	onExit: function() {
		//
		//	}

	});

});