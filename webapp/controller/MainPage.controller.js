sap.ui.define([
	"ShallYou/controller/BaseController"

], function (BaseController) {
	"use strict";
	var oController = "";
	var time = "";
	var FailedDialog = "";
	var PassedDialog="";

	return BaseController.extend("ShallYou.controller.MainPage", {

		onInit: function () {
			this.getRouter().getRoute("mainpage").attachPatternMatched(this.onRouteMatched, this);
			oController = this;
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
			FailedDialog = sap.ui.xmlfragment(oController.getView().getId(), "ShallYou.fragment.FailedDialog", this);
			oController.getView().addDependent(FailedDialog);
			PassedDialog = sap.ui.xmlfragment(oController.getView().getId(), "ShallYou.fragment.PassedDialog", this);
			oController.getView().addDependent(PassedDialog);

		},

		onAfterRendering: function () {

		},

		onRouteMatched: function (oEvent) {

			var levelId = oEvent.getParameter("arguments").levelId;
			var url = "onSkip?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&skipType=Ad"
			serviceObject.read(url, levelId, this.onSkipCallback, this);

			/*testing*/
			//this.onSkipCallback("", true, levelId);
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

			time = 10;
			this.getOwnerComponent().getModel("global").setProperty("/passedAttempts", 0);
			this.getOwnerComponent().getModel("global").setProperty("/failedAttempts", 0);
			this.getOwnerComponent().getModel("global").setProperty("/usedCharacters", "");
			this.setHints(data);
			this.createInputFields(data);
			this.resetKeyboardState();
			this.initializeTimer(10, "#90FF33");
			this.startTimer();
			//this.createGameStartAnimation();

		},

		createInputFields: function (data) {
			var mName = data.name;
			//mName = "Kabhi khushi kabhi gham";
			var mLength = mName.length;
			var mNameArray = mName.split(" ");

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

			var j = 0;
			for (var i = 0; i < mNameArray.length; i++) {
				if(i === 50){
					break;
				}
				var leftSpaces = 6 - gridControl.getContent().length % 6;
				//what if word is more than 6 chars
				
				if ((i === 0 && leftSpaces < mNameArray[i].length) || (i > 0 && leftSpaces < mNameArray[i].length + 1)) {
					for (var k = 0; k < leftSpaces; k++) {
						/*gridControl.addContent(new sap.m.Text({
							text: " empty "
						}));*/
						var inputField = new sap.m.Input({
							value: "Empty"
						});
						inputField.setEnabled(false);
						gridControl.addContent(inputField);
					}
					i--;
				} else {
					if (i > 0 && leftSpaces < 6) {
						//gridControl.addContent(new sap.m.Text());
						var inputField = new sap.m.Input({
							value: "Empty"
						});
						inputField.setEnabled(false);
						gridControl.addContent(inputField);
					}

					for (var l = 0; l < mNameArray[i].length; l++) {
						var inputField = new sap.m.Input(this.createId("Input" + j)).addStyleClass("mainPageMovieAlphabetInput");
						inputField.setEnabled(false);
						gridControl.addContent(inputField);
						j++;
					}
				}
			}
		},

		setHints: function (data) {
			this.getView().byId("hintText1").setText(data.hint1);
			this.getView().byId("hintText1").setText(data.hint2);
		},

		resetKeyboardState: function () {
			var buttons = ["ab", "bb", "cb", "db", "eb", "fb", "gb", "hb", "ib", "jb", "kb", "lb", "mb", "nb", "ob", "pb", "qb", "rb", "sb",
				"tb", "ub", "vb", "wb", "xb", "yb", "zb", "_b"
			];

			for (var i = 0; i < buttons.length; i++) {
				var button = this.byId(buttons[i]);
				button.setEnabled(true);
				button.removeStyleClass("mainPageRightCharButton");
				button.removeStyleClass("mainPageWrongCharButton");
			}
		},

		initializeTimer: function (time, color) {

			$(".timerContainer").TimeCircles().destroy();
			this.byId("timerContainer").getCustomData()[0].setValue("" + time);
			$(".timerContainer").TimeCircles({
				start: false,
				count_past_zero: false,
				animation_interval: "ticks", //"smooth"
				total_duration: time,
				circle_bg_color: "#60686F",
				fg_width: 0.1,
				bg_width: 1.2,
				text_size: 0.07,
				number_size: 0.28,
				time: {
					Days: {
						show: false
					},
					Hours: {
						show: false
					},
					Minutes: {
						show: false
					},
					Seconds: {
						text: "",
						color: color
					}
				}
			});
			$(".timerContainer").TimeCircles().addListener(oController.onTimerChange);
		},

		startTimer: function () {

			$(".timerContainer").TimeCircles().start();
			/*$(".timerContainer").animate({
				height: 'toggle'
			}, "fast");
			$(".timerContainer").animate({
				height: 'toggle'
			}, "fast");*/

		},

		pauseTimer: function () {
			$(".timerContainer").TimeCircles().stop();
		},

		restartTimer: function () {
			$(".timerContainer").TimeCircles().restart();
		},

		onTimerChange: function (unit, value, total) {
			//console.log(unit, value, total);
			if (value === 0) {
				//sap.m.MessageToast.show("Times's Up!");
				//$(".timerContainer").animate({left: '10px'}).animate({right: '10px'});
				/*var hBox = this.byId("timerContainer");
				hBox.addStyleClass("shake");
				window.setTimeout(function () {
					hBox.removeStyleClass("shake");
				}, 2000);*/
				$(".timerContainer").removeClass("shake");
				oController.byId("failedDialogReasonText").setText("Time's Up!");
				FailedDialog.open();
				//$(".timerContainer").fadeOut();
			} else {
				if ((value / time) * 100 <= 30) {
					$(".timerContainer").addClass("shake");
					window.setTimeout(function () {
						$(".timerContainer").removeClass("shake");
					}, 100);
				}
			}
		},

		onPressChar: function (oEvent) {

			var button = oEvent.getSource();
			button.setEnabled(false);
			var buttonId = oEvent.getSource().getId().slice(-2);
			var char = buttonId.charAt(0).toUpperCase();

			/*var url = "checkChar?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&level=Level1&chkChar=" + char;
			serviceObject.readWithoutCallback(url, "");*/
			
			var failedAttempts = this.getOwnerComponent().getModel("global").getProperty("/failedAttempts");

			var mName = this.getOwnerComponent().getModel("global").getProperty("/Movie").name;
			mName = mName.toUpperCase();
			mName = mName.replace(new RegExp(' ', 'g'), '');
			var res = mName.split("");
			var failedAttempt = true;
			for (var i = 0; i < res.length; i++) {
				if (res[i] === char || (char === "_" && !isNaN(res[i]))) {
					failedAttempt = false;
					//this.getView().byId("Input" + i).setValue(char);
					this.getView().byId("Input" + i).setValue(res[i]);
					button.addStyleClass("mainPageRightCharButton");
				}
			}
			if (failedAttempt) {
				button.addStyleClass("mainPageWrongCharButton");

				var usedCharacters = this.getOwnerComponent().getModel("global").getProperty("/usedCharacters");
				var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
				var indexOxUsed = usedCharacters.indexOf(char);
				if (indexOxUsed < 0) {

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

					if (failedAttempts === this.getOwnerComponent().getModel("global").getProperty("/possibleAttempts")) {
						this.pauseTimer();
						this.byId("failedDialogReasonText").setText("Maximum possible attempts reached!");
						FailedDialog.open();
					}

					this.getOwnerComponent().getModel("global").setProperty("/failedAttempts", failedAttempts);
					this.getOwnerComponent().getModel("global").setProperty("/usedCharacters", usedCharacters);
				}
			} else {
				var passedAttempts = this.getOwnerComponent().getModel("global").getProperty("/passedAttempts");
				passedAttempts++;
				var uniqueChars=res.filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
				var numbers=uniqueChars.match(/[0-9]+/g).length;
				var subtractor=numbers > 1 ? 1 : 0;
				if (passedAttempts === uniqueChars.length - subtractor) {
					var score = Math.ceil(((uniqueChars.length - subtractor)/(passedAttempts + failedAttempts))*100);
					this.byId("passedDialogScoreText").setText("Your Passing Score: " + score + "%");
						PassedDialog.open();
				} else {
					this.getOwnerComponent().getModel("global").setProperty("/passedAttempts", passedAttempts);
				}
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

		failedDialogEscapeHandler: function (promise) {
			Promise.reject();
		},

		showMovie: function () {
			serviceObject.readWithoutCallback("getShowMovie?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&movieIdl=1", "");
			this.getOwnerComponent().getModel("global").getData();

		},

		proceedToNextMovie: function () {

		}

	});
});