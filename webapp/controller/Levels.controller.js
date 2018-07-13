sap.ui.define([
	"ShallYou/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.Levels", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ShallYou.view.InitialView
		 */
		onInit: function() {
			this.getRouter().getRoute("levels").attachPatternMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function() {
			this.byId("levelList").removeSelections(true);
			//serviceObject.read("onGetUnlockedLevel?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1", "", this.getLevelsCallback, this);
		},

		getLevelsCallback: function(data, response) {
			if (response) {
				var levelIds = Object.keys(data).sort();
				var levels = [];
				for (var i = 0; i < levelIds.length; i++) {
					levels.push({
						"levelId": levelIds[i],
						"levelName": levelIds[i],
						"unlocked": data[levelIds[i]],
						"levelProgress": 0
					});
				}

				this.getView().getModel().setData(levels);
			}
		},

		onSelectLevel: function(oEvent) {
			//var levelId="1";
			var levelObject = oEvent.getParameters().listItem.getBindingContext("global").getObject();

			if (!levelObject.locked) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("mainpage", {
					levelId: levelObject.levelId
				});
			} else {
				var icon = oEvent.getParameters().listItem.getAggregation("content")[0].getAggregation("items")[0].getAggregation("items")[0];
				icon.addStyleClass("shake");
				window.setTimeout(function() {
					icon.removeStyleClass("shake");
				}, 2000);
				this.byId("levelList").removeSelections(true);
			}

			/*Hardcoding for testing*/
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("mainpage", {
				levelId: "Level1"
			});
			/*`````````````*/

		}

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