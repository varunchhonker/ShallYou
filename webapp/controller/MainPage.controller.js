sap.ui.define([
	"ShallYou/controller/BaseController"

], function (BaseController) {
	"use strict";

	return BaseController.extend("ShallYou.controller.MainPage", {

		onInit: function () {
			this.getRouter().getRoute("mainpage").attachPatternMatched(this.onRouteMatched, this);

			/*var attempts = {
				failedAttempts: 0,
				possibleAttempts: 9,
				usedCharacters: ""
			};
			var oModel = new sap.ui.model.json.JSONModel("attempts");
			oModel.setData(attempts);
			this.getView().setModel(oModel);*/
			//this.initializeView();
			// this.getView().byId("used").setSrc(sRootPath + "/used.png");	
			// });

		},

		onAfterRendering: function () {

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

		onRouteMatched: function (oEvent) {
			var oController = this;
			var levelId = oEvent.getParameter("arguments").levelId;
			/*var url = "onSkip?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&skipType=Ad"
			serviceObject.read(url, levelId, this.onSkipCallback, this);*/

			/*testing*/
			this.onSkipCallback("", true, levelId);
			/*`````````*/
			var gridControl = this.getView().byId("gridLayout");
			gridControl.destroyContent();
		},

		onSkipCallback: function (data, response, levelId) {
			if (response) {
				var url = "getNextMovies?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&level=" + levelId;
				serviceObject.read(url, "", this.getNextMovieCallback, this);
			}
		},

		getNextMovieCallback: function (data, response) {
			if (response) {
				this.getOwnerComponent().getModel("global").setProperty("/Movie", data);
				this.initializeView(data);
			}
		},

		initializeView: function (data) {
			var mName = data.name;
			this.getView().byId("hintText1").setText(data.hint1);
			this.getView().byId("hintText1").setText(data.hint2);
			var mLength = mName.length;
			var mNameArray = mName.split(" ");

			var inputField = null;
			var gridControl = this.getView().byId("gridLayout");
			/*for (var i = 0; i < mLength; i++) {
				if (mName[i] === " ") {
					gridControl.addContent(new sap.m.Text());
				} else {
					inputField = new sap.m.Input(this.createId("Input" + i)).addStyleClass("mainPageMovieAlphabetInput");
					inputField.setEnabled(false);
					inputField.addStyleClass("inputColor");
					gridControl.addContent(inputField);
				}
			}*/

			for (var i = 0; i < mNameArray.length; i++) {
				var leftSpaces = 6 - Math.ceil(gridControl.getContent().length / 6);
				if (leftSpaces < mNameArray[i].length) {
					for (var j = 0; j < leftSpaces.length; j++) {
						gridControl.addContent(new sap.m.Text());
					}
				} else {
					for (var j = 0; j < mNameArray[i].length; j++) {
						inputField = new sap.m.Input(this.createId("Input" + j)).addStyleClass("mainPageMovieAlphabetInput");
						inputField.setEnabled(false);
						inputField.addStyleClass("inputColor");
						gridControl.addContent(inputField);
					}
				}
			}
			this.startTimer();
			//this.createGameStartAnimation();

		},
		onPressChar: function (oEvent) {

			var button = oEvent.getSource();
			button.setEnabled(false);
			var buttonId = oEvent.getSource().getId().slice(-2);
			var char = buttonId.charAt(0).toUpperCase();

			//var url = "checkChar?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&level=Level1&chkChar=" + char;
			//serviceObject.read(url, "", this.getCheckCharCallback, this);

			var mName = this.getOwnerComponent().getModel("global").getProperty("/Movie").name;
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
				var failedAttempts = this.getOwnerComponent().getModel("global").getProperty("/failedAttempts");
				var usedCharacters = this.getOwnerComponent().getModel("global").getProperty("/usedCharacters");
				var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
				var indexOxUsed = usedCharacters.indexOf(char);
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

					if (failedAttempts === 0) {
						var control = this.getView().byId("i1");
						var src = sRootPath + "/B_.png";
					} else if (failedAttempts === 1) {
						var control = this.getView().byId("i2");
						var src = sRootPath + "/O_.png";
					} else if (failedAttempts === 2) {
						var control = this.getView().byId("i3");
						var src = sRootPath + "/L_.png";
					} else if (failedAttempts === 3) {
						var control = this.getView().byId("i4");
						var src = sRootPath + "/L_.png";
					} else if (failedAttempts === 4) {
						var control = this.getView().byId("i5");
						var src = sRootPath + "/Y_.png";
					} else if (failedAttempts === 5) {
						var control = this.getView().byId("i6");
						var src = sRootPath + "/W_.png";
					} else if (failedAttempts === 6) {
						var control = this.getView().byId("i7");
						var src = sRootPath + "/O_.png";
					} else if (failedAttempts === 7) {
						var control = this.getView().byId("i8");
						var src = sRootPath + "/O_.png";
					} else if (failedAttempts === 8) {
						var control = this.getView().byId("i9");
						var src = sRootPath + "/D_.png";

						sap.m.MessageToast.show("You Failed! Try another one.");
					}

					this.indicateFailedAttempt(control, src, char);

					failedAttempts++;
					usedCharacters = char.concat(usedCharacters);

					this.getOwnerComponent().getModel("global").setProperty("/failedAttempts", failedAttempts);
					this.getOwnerComponent().getModel("global").setProperty("/usedCharacters", usedCharacters);
				}
			}
		},

		startTimer: function () {
			$(".timerContainer").TimeCircles().start();
			$(".timerContainer").animate({height: 'toggle'}, "fast");
			$(".timerContainer").animate({height: 'toggle'}, "fast");

		},

		onTimerChange: function (unit, value, total) {
			//console.log(unit, value, total);
			if (value === 0) {
				sap.m.MessageToast.show("Times's Up!");
			}
		},

		indicateFailedAttempt: function (control, src, char) {

			$('#' + control.getId()).fadeOut(500, function () {
				control.setSrc(src);
				control.setLabel(char);
				$('#' + control.getId()).fadeIn(500);
			});
		},

		createGameStartAnimation: function () {
			var controlIds = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"];
			for (var i = 0; i < controlIds.length; i++) {
				var control = this.byId(controlIds[i]);
				$('#' + control.getId()).fadeOut(500, function () {
					$('#' + control.getId()).fadeIn(500);
				});
			}

		},

	});
});