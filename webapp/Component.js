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
				Sounds: true,
				ClockTicks: false,
				Music: false

			}).setDefaultBindingMode("OneWay"), "global");
			// set the device model
			//	var sRootPath =jQuery.sap.getModulePath("ShallYou.images");
			this.setModel(models.createDeviceModel(), "device");

			serviceObject.read("getUserProfile?userId=IdjJ4KZIdTYeGI2yKcOx4BFgODi2", "", this.getUserProfileCallback, this);
			this.addSoundElements();
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
			$('<audio id="clockTickSound" preload="auto" loop><source src="sounds/clockTick1.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="clockTimeOverBellSound" preload="auto"><source src="sounds/clockTimeOverBell.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="switchChangeSound" preload="auto"><source src="sounds/switchChange1.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="errorSound" preload="auto"><source src="sounds/error.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			
			$('<audio id="backgroundMusic" volume="0.3" preload="auto" loop><source src="sounds/backgroundMusic1.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			if (this.getModel("global").getProperty("/Music")) {
				$('#backgroundMusic')[0].play();
			}
			
			$('<audio id="rightCharSound" preload="auto"><source src="sounds/pass4.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="passSound" preload="auto"><source src="sounds/pass5.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			
			$('<audio id="wrongCharSound" preload="auto"><source src="sounds/fail1.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			$('<audio id="failSound" preload="auto"><source src="sounds/fail2.mp3" type = "audio/mpeg"></audio>').appendTo('body');
			
		}
	});
});