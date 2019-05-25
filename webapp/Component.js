sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"ShallYou/model/models"

], function (UIComponent, Device, JSONModel, models) {
	"use strict";

	return UIComponent.extend("ShallYou.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			//jQuery.sap.require("ShallYou.js.service");
			this.setModel(new JSONModel({
				modulePath: jQuery.sap.getModulePath("ShallYou"),
				firstTime: true,
				failedAttempts: 0,
				passedAttempts: 0,
				possibleAttempts: 9,
				usedCharacters: "",
				Movie: "",
				Sounds: localStorage.getItem("Sounds") ? (localStorage.getItem("Sounds") === "true") : true,
				ClockTicks: localStorage.getItem("ClockTicks") ? (localStorage.getItem("ClockTicks") === "true") : false,
				Music: localStorage.getItem("Music") ? (localStorage.getItem("Music") === "true") : false

			}).setDefaultBindingMode("OneWay"), "global");
			// set the device model
			//	var sRootPath =jQuery.sap.getModulePath("ShallYou.images");
			this.setModel(models.createDeviceModel(), "device");

			serviceObject.read("getUserProfile?userId=zLJcPPx9ChbD52eiKcQeOnq8fst1", "", this.getUserProfileCallback, this);
			this.addSoundElements();
			this.initializeFirebase();
			this.configureAdmob();
		},

		initializeFirebase: function () {
			// Initialize Firebase
			var config = {
				apiKey: "AIzaSyDKY3fjVNQtDtuBAJNVhi7DYkZy_KFy1Ds",
				authDomain: "shallyou-817e0.firebaseapp.com",
				databaseURL: "https://shallyou-817e0.firebaseio.com",
				projectId: "shallyou-817e0",
				storageBucket: "shallyou-817e0.appspot.com",
				messagingSenderId: "414685995754"
			};
			firebase.initializeApp(config);
			firebase.auth().onAuthStateChanged(function (user) {
				//console.log(user);
			});
			firebase.auth().signInAnonymously().catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
			});

		},

		getUserProfileCallback: function (data, response) {
			if (response) {
				this.getModel("global").setProperty("/Journey", data.journey);
				this.getModel("global").setProperty("/Coins", data.coinsLeft);
				this.getModel("global").setProperty("/Levels", data.level);
				if (data.journey) {
					this.getModel("global").setProperty("/firstTime", false);
				}
			}
		},

		addSoundElements: function () {
			$('<audio id="buttonSound" preload="auto"><source src="sounds/buttonPress2.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			/*<source src="sounds/buttonPress.mp3" type="audio/ogg">*/
			$('<audio id="clockTickSound" preload="auto" loop><source src="sounds/clockTick3.mp3" type = "audio/mpeg"></audio>').appendTo(
				'body');
			$('<audio id="clockTimeOverBellSound" preload="auto"><source src="sounds/clockTimeOverBell.mp3" type = "audio/mpeg"></audio>').appendTo(
				'body');
			$('<audio id="switchChangeSound" preload="auto"><source src="sounds/switchChange1.mp3" type = "audio/mpeg"></audio>').appendTo(
				'body');
			$('<audio id="errorSound" preload="auto"><source src="sounds/error.mp3" type = "audio/mpeg"></audio>').appendTo('body');

			$(
				'<audio id="backgroundMusic" volume="0.3" preload="auto" loop><source src="sounds/backgroundMusic1.mp3" type = "audio/mpeg"></audio>'
			).appendTo('body');
			$(document).ready(function () {
				if (this.getModel("global").getProperty("/Music")) {
					$('#backgroundMusic')[0].play();
				}
			}.bind(this));

			$('<audio id="rightCharSound" preload="auto"><source src="sounds/pass4.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="passSound" preload="auto"><source src="sounds/pass5.mp3" type = "audio/mpeg"></audio>').appendTo('body');

			$('<audio id="wrongCharSound" preload="auto"><source src="sounds/fail1.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="failSound" preload="auto"><source src="sounds/fail2.mp3" type = "audio/mpeg"></audio>').appendTo('body');

		},

		configureAdmob: function () {

			document.addEventListener('admobInit', function () {
				admob.settings = {
					overlapWebView: false,
					bannerAutoShow: false,
					bannerPosition: 'top', // or 'bottom'
					bannerSize: 'SMART_BANNER', // see sizes at https://developers.google.com/admob/android/banner
					bannerID: 'ca-app-pub-3940256099942544/6300978111',
					interstitialID: 'ca-app-pub-3940256099942544/1033173712',
					rewardID: 'ca-app-pub-3940256099942544/5224354917',
					appID: 'ca-app-pub-3940256099942544~3347511713',
					userID: 'xxx'
				};
			});

		}
	});
});