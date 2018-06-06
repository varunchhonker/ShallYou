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

		onAfterRendering: function() {

			$(".timerContainer").TimeCircles({
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
			$(".timerContainer").TimeCircles().addListener(oController.onTimerChange);

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
			this.getView().byId("hintText").setText(mHintText);
			var mLength = mName.length;
			var inputField = null;
			var gridControl = this.getView().byId("gridLayout");
			for (var i = 0; i < mLength; i++) {
				if (mName[i] === " ") {
					gridControl.addContent(new sap.m.Text());
				} else {
					inputField = new sap.m.Input(this.createId("Input" + i));
					inputField.setEnabled(false);
					inputField.addStyleClass("inputColor");
					gridControl.addContent(inputField);
				}
			}
			// this.getView().byId("hintImage").onAfterRendering({
			/*var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
			var sImagePath = sRootPath + "/B.png";
			this.getView().byId("b").setSrc(sImagePath);
			this.getView().byId("o").setSrc(sRootPath + "/O.png");
			this.getView().byId("l1").setSrc(sRootPath + "/L.png");
			this.getView().byId("l2").setSrc(sRootPath + "/L.png");
			this.getView().byId("y").setSrc(sRootPath + "/Y.png");
			this.getView().byId("w").setSrc(sRootPath + "/W.png");
			this.getView().byId("o1").setSrc(sRootPath + "/O.png");
			this.getView().byId("o2").setSrc(sRootPath + "/O.png");
			this.getView().byId("d").setSrc(sRootPath + "/D.png");*/
		},
		onPressChar: function(oEvent) {
			var button = oEvent.getSource();
			button.setEnabled(false);
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
					button.addStyleClass("mainPageRightCharButton");
				}
			}
			if (failedAttempt) {
				button.addStyleClass("mainPageWrongCharButton");
				var attempts = this.getView().getModel().getData();
				var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
				var indexOxUsed = attempts.usedCharacters.indexOf(char);
				if (indexOxUsed < 0) {

					/*if (attempts.failedAttempts === 0) {
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
					}*/

					if (attempts.failedAttempts === 0) {
						var control = this.getView().byId("i1");
						var src = sRootPath + "/B_.png";
					} else if (attempts.failedAttempts === 1) {
						var control = this.getView().byId("i2");
						var src = sRootPath + "/O_.png";
					} else if (attempts.failedAttempts === 2) {
						var control = this.getView().byId("i3");
						var src = sRootPath + "/L_.png";
					} else if (attempts.failedAttempts === 3) {
						var control = this.getView().byId("i4");
						var src = sRootPath + "/L_.png";
					} else if (attempts.failedAttempts === 4) {
						var control = this.getView().byId("i5");
						var src = sRootPath + "/Y_.png";
					} else if (attempts.failedAttempts === 5) {
						var control = this.getView().byId("i6");
						var src = sRootPath + "/W_.png";
					} else if (attempts.failedAttempts === 6) {
						var control = this.getView().byId("i7");
						var src = sRootPath + "/O_.png";
					} else if (attempts.failedAttempts === 7) {
						var control = this.getView().byId("i8");
						var src = sRootPath + "/O_.png";
					} else if (attempts.failedAttempts === 8) {
						var control = this.getView().byId("i9");
						var src = sRootPath + "/D_.png";
					}

					this.indicateAttempt(control, src, char);

					attempts.failedAttempts++;
					attempts.usedCharacters = char.concat(attempts.usedCharacters);
				}
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

		indicateAttempt: function(control, src, char) {

			$('#' + control.getId()).fadeOut(500, function() {
				control.setSrc(src);
				control.setLabel(char);
				$('#' + control.getId()).fadeIn(500);
			});
		}

	});
});