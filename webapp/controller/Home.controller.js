sap.ui.define([
	"ShallYou/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.Home", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ShallYou.view.InitialView
		 */
		onInit: function() {

		},

		onAfterRendering: function() {
			/*$(".timerContainer").TimeCircles({
				start: false,
				count_past_zero: false,

				time: {
					Days: {
						show: false,
						color: "#C0C8CF"
					},
					Hours: {
						show: false,
						color: "#C0C8CF"
					},
					Minutes: {
						show: false,
						color: "#C0C8CF"
					},
					Seconds: {
						text: "",
						color: "#C0C8CF"
					}
				}
			});
			var oController = this;
			$(".timerContainer").TimeCircles().addListener(oController.onTimerChange);*/

		},

		onPressPlay: function(oEvent) {
			var firstTime=this.getOwnerComponent().getModel("global").getProperty("/firstTime");
			if (firstTime) {
				this.getRouter().navTo("journey");
			}else{
				this.getRouter().navTo("levels");
			}
		},

		startTimer: function() {
			$(".timerContainer").TimeCircles().start();
			/*$(".timerContainer").animate({height: 'toggle'}, "fast");
			$(".timerContainer").animate({height: 'toggle'}, "fast");*/

		},

		onTimerChange: function(unit, value, total) {
			//console.log(unit, value, total);
			if (value === 0) {
				sap.m.MessageToast.show("Times's Up!");
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