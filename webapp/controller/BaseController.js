sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("ShallYou.controller.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function () {
			this.playButtonSound();
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined && !sPreviousHash.toLowerCase().includes("journey")) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("home", {}, bReplace);
			}
		},

		onPressRules: function (oEvent) {
			this.playButtonSound();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("rules");
		},

		onPressCoin: function (oEvent) {
			this.playButtonSound();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("purchases");
		},

		onPressProfile: function (oEvent) {
			this.playButtonSound();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("userpage");
		},

		onPressSettings: function (oEvent) {
			this.playButtonSound();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("settings");
		},

		onPressLevels: function (oEvent) {
			this.playButtonSound();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("levels");
		},
		
		playPauseBackgroundMusic: function (oEvent) {
			if (this.getOwnerComponent().getModel("global").getProperty("/Music")) {
				$('#backgroundMusic')[0].play();
			}else{
				$('#backgroundMusic')[0].pause();
			}
		},

		playButtonSound: function (oEvent) {
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#buttonSound')[0].play();
			}
		},

		playClockTickSound: function () {
			if (this.getOwnerComponent().getModel("global").getProperty("/ClockTicks")) {
				$('#clockTickSound')[0].play();
			}
		},

		playClockTimeOverBellSound: function () {
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#clockTimeOverBellSound')[0].play();
			}
		},
		
		playSwitchChangeSound: function () {
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#switchChangeSound')[0].play();
			}
		},
		
		playLevelLockedSound:function(){
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#errorSound')[0].play();
			}	
		},

		pauseClockTickSound: function () {
			$('#clockTickSound')[0].pause();
		},
		
		playWrongCharSound:function(){
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#wrongCharSound')[0].play();
			}
		},
		
		playFailSound:function(){
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#failSound')[0].play();
			}
		},
		
		playPassSound:function(){
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#passSound')[0].play();
			}
		},
		
		playRightCharSound:function(){
			if (this.getOwnerComponent().getModel("global").getProperty("/Sounds")) {
				$('#rightCharSound')[0].play();
			}
		},
	

	});

});