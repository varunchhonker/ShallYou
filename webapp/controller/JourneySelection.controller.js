sap.ui.define([
	"ShallYou/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.JourneySelection", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ShallYou.view.InitialView
		 */
		onInit: function() {
			this.getRouter().getRoute("journey").attachPatternMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function() {
			var journey = this.getOwnerComponent().getModel("global").getProperty("/Journey");
			var buttons = this.byId("journeyRBG").getButtons();
			for (var i = 0; i < buttons.length; i++) {
				if (buttons[i].getText() === journey) {
					break;
				}
			}
			this.byId("journeyRBG").setSelectedButton(buttons[i]);
		},

		onPressNext: function(oEvent) {
			//do service call to set journey
			this.getView().byId("nextButton").setEnabled(false);
			var journey = this.byId("journeyRBG").getSelectedButton().getText();
			serviceObject.read("changeJourney?userId=IdjJ4KZIdTYeGI2yKcOx4BFgODi2&journey=" + journey, "", this.setJourneyCallback, this);
		},

		onJourneySelection: function(oEvent) {
			this.getView().byId("nextButton").setEnabled(true);
		},

		setJourneyCallback: function(data, response) {
			if (response) {
				var oController=this;
				this.getOwnerComponent().getModel("global").setProperty("/firstTime", false);
				setTimeout(function() {
					serviceObject.read("getUserProfile?userId=IdjJ4KZIdTYeGI2yKcOx4BFgODi2", "", oController.getUserProfileCallback, oController);
				}, 3000);
			}
		},

		getUserProfileCallback: function(data, response) {
			if (response) {
				this.getOwnerComponent().getModel("global").setProperty("/Journey", data.journey);
				this.getOwnerComponent().getModel("global").setProperty("/Coins", data.coinsLeft);
				this.getOwnerComponent().getModel("global").setProperty("/Levels", data.level);
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