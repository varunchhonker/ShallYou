sap.ui.define([
	"ShallYou/controller/BaseController"

], function(BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.MainPage", {

		onInit: function() {
			this.getRouter().getRoute("mainpage").attachPatternMatched(this.onRouteMatched, this);

			var attempts = {
				failedAttempts: 0,
				possibleAttempts: 9,
				usedCharacters: ""
			};
			var oModel = new sap.ui.model.json.JSONModel("attempts");
			oModel.setData(attempts);
			this.getView().setModel(oModel);
			this.initializeView();
			// this.getView().byId("used").setSrc(sRootPath + "/used.png");	
			// });

		},

		onRouteMatched: function(oEvent) {
			var oController = this;
			var levelId = oEvent.getParameter("arguments").levelId;
			var url = "onSkip?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&skipType=Ad"
			serviceObject.read(url, levelId, this.onSkipCallback, this);
		},

		onSkipCallback: function(data, response, levelId) {
			if (response) {
				var url = "getNextMovies?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&level=" + levelId;
				serviceObject.read(url, "", this.getNextMovieCallback, this);
			}
		},

		getNextMovieCallback: function(data, response) {

		},

		initializeView: function() {
			var attempts = {
				failedAttempts: 0,
				possibleAttempts: 9,
				usedCharacters: ""
			};
			// this.getView().getModel.setData(attempts);
			var mName = "This is test";
			var mHintText =
				"This is a real challenge. Remake of this movie has greated star of Indian cinema as voted by BBC news online users.";
			var mLength = mName.length;
			var inputField = null;
			var gridControl = this.getView().byId("gridLayout");
			for (var i = 0; i < mLength; i++) {
				inputField = new sap.m.Input(this.createId("Input" + i));
				inputField.setEnabled(false);
				inputField.addStyleClass("inputColor");
				gridControl.addContent(inputField);
			}
			// this.getView().byId("hintImage").onAfterRendering({
			var sRootPath = jQuery.sap.getModulePath("ShallYou.images");

			var sImagePath = sRootPath + "/B.png";
			this.getView().byId("hintText").setText(mHintText);
			this.getView().byId("b").setSrc(sImagePath);
			this.getView().byId("o").setSrc(sRootPath + "/O.png");
			this.getView().byId("l1").setSrc(sRootPath + "/L.png");
			this.getView().byId("l2").setSrc(sRootPath + "/L.png");
			this.getView().byId("y").setSrc(sRootPath + "/Y.png");
			this.getView().byId("w").setSrc(sRootPath + "/W.png");
			this.getView().byId("o1").setSrc(sRootPath + "/O.png");
			this.getView().byId("o2").setSrc(sRootPath + "/O.png");
			this.getView().byId("d").setSrc(sRootPath + "/D.png");
		},
		onPressChar: function(oEvent) {

			var buttonId = oEvent.getSource().getId().slice(-2);
			var char = buttonId.charAt(0).toUpperCase();
			var mName = "This is test";
			mName = mName.toUpperCase();
			var res = mName.split("");
			var failedAttempt = true;
			for (var i = 0; i < res.length; i++) {
				if (res[i] === char) {
					failedAttempt = false;
					this.getView().byId("Input" + i).setValue(char);
				}
			}
			if (failedAttempt) {
				var attempts = this.getView().getModel().getData();
				var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
				var indexOxUsed = attempts.usedCharacters.indexOf(char);
				if (indexOxUsed < 0) {

					if (attempts.failedAttempts === 0) {
						this.getView().byId("b").setSrc(sRootPath + "/B_.png");
						this.getView().byId("bi").setValue(char);
					} else if (attempts.failedAttempts === 1) {
						this.getView().byId("o").setSrc(sRootPath + "/O_.png");
						this.getView().byId("oi").setValue(char);
					} else if (attempts.failedAttempts === 2) {
						this.getView().byId("l1").setSrc(sRootPath + "/L_.png");
						this.getView().byId("l1i").setValue(char);
					} else if (attempts.failedAttempts === 3) {
						this.getView().byId("l2").setSrc(sRootPath + "/L_.png");
						this.getView().byId("l2i").setValue(char);
					} else if (attempts.failedAttempts === 4) {
						this.getView().byId("y").setSrc(sRootPath + "/Y_.png");
						this.getView().byId("yi").setValue(char);
					} else if (attempts.failedAttempts === 5) {
						this.getView().byId("w").setSrc(sRootPath + "/W_.png");
						this.getView().byId("wi").setValue(char);
					} else if (attempts.failedAttempts === 6) {
						this.getView().byId("o1").setSrc(sRootPath + "/O_.png");
						this.getView().byId("o1i").setValue(char);
					} else if (attempts.failedAttempts === 7) {
						this.getView().byId("o2").setSrc(sRootPath + "/O_.png");
						this.getView().byId("o2i").setValue(char);
					} else if (attempts.failedAttempts === 8) {
						this.getView().byId("d").setSrc(sRootPath + "/D_.png");
						this.getView().byId("di").setValue(char);
					}

					attempts.failedAttempts++;
					attempts.usedCharacters = char.concat(attempts.usedCharacters);
				}
			}
		}

	});
});