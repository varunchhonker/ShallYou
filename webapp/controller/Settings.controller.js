sap.ui.define([
	"ShallYou/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.Settings", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ShallYou.view.App
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ShallYou.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ShallYou.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ShallYou.view.App
		 */
		//	onExit: function() {
		//
		//	},

		onPressChangeJourney: function () {
			this.playButtonSound();
			this.getRouter().navTo("journey");
		},

		onChangeSoundSwitch: function (oEvent) {
			this.playSwitchChangeSound();
			this.getOwnerComponent().getModel("global").setProperty("/Sounds", oEvent.getParameter("state"));
			localStorage.setItem("Sounds", oEvent.getParameter("state"));
		},

		onChangeClockTicksSwitch: function (oEvent) {
			this.playSwitchChangeSound();
			this.getOwnerComponent().getModel("global").setProperty("/ClockTicks", oEvent.getParameter("state"));
			localStorage.setItem("ClockTicks", oEvent.getParameter("state"));
		},

		onChangeMusicSwitch: function (oEvent) {
			this.playSwitchChangeSound();
			this.getOwnerComponent().getModel("global").setProperty("/Music", oEvent.getParameter("state"));
			this.playPauseBackgroundMusic();
			localStorage.setItem("Music", oEvent.getParameter("state"));
		},

	});

});