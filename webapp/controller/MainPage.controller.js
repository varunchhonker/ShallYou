sap.ui.define([
	"ShallYou/controller/BaseController",
	"sap/ui/core/routing/History"

], function (BaseController, History) {
	"use strict";
	var oController = "";
	var time = 60;
	var FailedDialog = "";
	var PassedDialog = "";

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

			this.pauseTimer();
		},

		onRouteMatched: function (oEvent) {
			var levelId = oEvent.getParameter("arguments").levelId;
			this.getOwnerComponent().getModel("global").setProperty("/currentLevel", levelId);
			this.getMovie();
		},

		getMovie: function () {
			var url = "onSkip?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&skipType=Ad";
			var levelId = this.getOwnerComponent().getModel("global").getProperty("/currentLevel");
			serviceObject.read(url, levelId, this.onSkipCallback, this);
			this.resetView();
		},

		resetView: function () {
			var gridControl = this.getView().byId("gridLayout");
			gridControl.destroyContent();
			this.getOwnerComponent().getModel("global").setProperty("/passedAttempts", 0);
			this.getOwnerComponent().getModel("global").setProperty("/failedAttempts", 0);
			this.getOwnerComponent().getModel("global").setProperty("/usedCharacters", "");
			this.resetKeyboardState();
			this.resetFailedAttemptIndicator();
		},

		onSkipCallback: function (data, response, levelId) {
			/*if (response) {
				var url = "getNextMovies?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1&level=" + levelId;
				serviceObject.read(url, "", this.getNextMovieCallback, this);
			}*/
			//data.name = "Rudraksh";
			//data.name="Kabhi khusshi kabhi gham";
			//data.name="Saajan ki aayegi baraat";
			//data.name="dil ka rishta bada hi pyaara hai";
			if (response) {
				this.getOwnerComponent().getModel("global").setProperty("/Movie", data);
				this.initializeView(data);
			}
		},

		/*getNextMovieCallback: function (data, response) {
			if (response) {
				this.getOwnerComponent().getModel("global").setProperty("/Movie", data);
				this.initializeView(data);
			}
		},*/

		initializeView: function (data) {

			time = 60;
			this.initializeTimer(time, "#90FF33");

			if (typeof data === "object") {
				this.setHints(data);
				this.createInputFields(data);
				this.startTimer();
			} else {
				sap.m.MessageToast.show(data);
			}

			//this.createGameStartAnimation();

		},

		createInputFields: function (data) {
			var mName = data.name;
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
			var gridColumns = 6;
			var leftSpaces = 6;
			for (var i = 0; i < mNameArray.length; i++) {

				if (i > 0 && ((mNameArray[i].length <= 6 && mNameArray[i].length > leftSpaces) || (mNameArray[i].length > 6 && leftSpaces < 6))) {
					for (var k = 0; k < leftSpaces; k++) {
						var inputField = new sap.m.Input({
							value: "Empty"
						}).addStyleClass("mainPageEmptyInput");
						inputField.setEnabled(false);
						gridControl.addContent(inputField);
					}
				}
				for (var l = 0; l < mNameArray[i].length; l++) {
					var inputField = new sap.m.Input(this.createId("Input" + j)).addStyleClass("mainPageMovieAlphabetInput");
					inputField.setEnabled(false);
					if (l === 0) {
						inputField.addStyleClass("mainPageMovieFirstAlphabetInput");
					}
					gridControl.addContent(inputField);
					j++;
				}

				leftSpaces = 6 - gridControl.getContent().length % 6;
				if (i < mNameArray.length - 1 && leftSpaces > 0 && leftSpaces < 6) {
					var inputField = new sap.m.Input({
						value: "Empty"
					}).addStyleClass("mainPageEmptyInput");
					inputField.setEnabled(false);
					gridControl.addContent(inputField);
					leftSpaces = 6 - gridControl.getContent().length % 6;
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

		resetFailedAttemptIndicator: function () {
			var sRootPath = jQuery.sap.getModulePath("ShallYou.images");
			if (this.getOwnerComponent().getModel("global").getProperty("/Journey") === "Hollywood") {
				this.byId("i1").setSrc(sRootPath + "/H.png");
				this.byId("i1").setLabel("");
			} else {
				this.byId("i1").setSrc(sRootPath + "/B.png");
				this.byId("i1").setLabel("");
			}
			this.byId("i2").setSrc(sRootPath + "/O.png");
			this.byId("i2").setLabel("");
			this.byId("i3").setSrc(sRootPath + "/L.png");
			this.byId("i3").setLabel("");
			this.byId("i4").setSrc(sRootPath + "/L.png");
			this.byId("i4").setLabel("");
			this.byId("i5").setSrc(sRootPath + "/Y.png");
			this.byId("i5").setLabel("");
			this.byId("i6").setSrc(sRootPath + "/W.png");
			this.byId("i6").setLabel("");
			this.byId("i7").setSrc(sRootPath + "/O.png");
			this.byId("i7").setLabel("");
			this.byId("i8").setSrc(sRootPath + "/O.png");
			this.byId("i8").setLabel("");
			this.byId("i9").setSrc(sRootPath + "/D.png");
			this.byId("i9").setLabel("");
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
			this.playClockTickSound();
			/*$(".timerContainer").animate({
				height: 'toggle'
			}, "fast");
			$(".timerContainer").animate({
				height: 'toggle'
			}, "fast");*/

		},

		pauseTimer: function () {
			$(".timerContainer").TimeCircles().stop();
			this.pauseClockTickSound();
		},

		restartTimer: function () {
			$(".timerContainer").TimeCircles().restart();
			this.playClockTickSound();
		},

		onTimerChange: function (unit, value, total) {
			//console.log(unit, value, total);
			if (value === 0) {
				//sap.m.MessageToast.show("Time's Up!");
				//$(".timerContainer").animate({left: '10px'}).animate({right: '10px'});
				/*var hBox = this.byId("timerContainer");
				hBox.addStyleClass("shake");
				window.setTimeout(function () {
					hBox.removeStyleClass("shake");
				}, 2000);*/
				$(".timerContainer").removeClass("shake");
				oController.onFail("Time's Up!");
				//$(".timerContainer").fadeOut();
			} else if (value === 1) {
				oController.playClockTimeOverBellSound();
				oController.pauseClockTickSound();
			} else {
				if ((value / time) * 100 <= 20) {
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
				this.playWrongCharSound();
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
					}

					this.indicateFailedAttempt(control, src, char);

					failedAttempts++;
					usedCharacters = char.concat(usedCharacters);

					if (failedAttempts === this.getOwnerComponent().getModel("global").getProperty("/possibleAttempts")) {
						this.pauseTimer();
						this.onFail("Maximum possible attempts reached!");
					}

					this.getOwnerComponent().getModel("global").setProperty("/failedAttempts", failedAttempts);
					this.getOwnerComponent().getModel("global").setProperty("/usedCharacters", usedCharacters);
				}
			} else {
				this.playRightCharSound();
				var passedAttempts = this.getOwnerComponent().getModel("global").getProperty("/passedAttempts");
				passedAttempts++;
				var uniqueChars = res.filter(function (item, i, ar) {
					return ar.indexOf(item) === i;
				}).join('');
				var numbers = 0;
				if (uniqueChars.match(/[0-9]+/g)) {
					numbers = uniqueChars.match(/[0-9]+/g).length;
				}
				var subtractor = numbers > 1 ? 1 : 0;
				if (passedAttempts === uniqueChars.length - subtractor) {
					var score = Math.ceil(((uniqueChars.length - subtractor) / (passedAttempts + failedAttempts)) * 100);
					this.pauseTimer();
					this.onPass("Your Passing Score: " + score + "%");

				} else {
					this.getOwnerComponent().getModel("global").setProperty("/passedAttempts", passedAttempts);
				}
			}
		},

		onFail: function (failText) {
			this.playFailSound();
			var url = "onTimeOut?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1";
			serviceObject.readWithoutCallback(url, "");
			this.byId("failedDialogReasonText").setText(failText);
			FailedDialog.open();
		},

		onPass: function (passText) {
			this.playPassSound();
			this.byId("passedDialogScoreText").setText(passText);
			PassedDialog.open();
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

		onPressShowMovie: function () {
			this.getRouter().navTo("movie");
			FailedDialog.close();
		},

		onPressPlayNextMovie: function () {
			this.getMovie();
			FailedDialog.close();
			PassedDialog.close();
		},

		onPressGoToLevels: function () {
			FailedDialog.close();
			PassedDialog.close();
			this.onPressLevels();
		},

	});
});