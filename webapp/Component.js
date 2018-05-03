sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"ShallYou/model/models"

], function(UIComponent, Device, JSONModel, models) {
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
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			var dataSet = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "json/movies.json",
				'dataType': "json",
				'success': function(data) {
					dataSet = data;
				}
			});

			/*var dataInsert = [];
			var actualData = [];
			var batchQuery = [];
			var batchQ = "";
			var queryString = 'INSERT INTO DemoTable VALUES ';
			var ph = "";
			for (var i = 0; i < dataSet.movies.length; i++) {
				actualData.push(dataSet.movies[i].MovieHint);
				actualData.push(dataSet.movies[i].MovieId);
				actualData.push(dataSet.movies[i].MovieImage);
				actualData.push(dataSet.movies[i].MovieLevel);
				actualData.push(dataSet.movies[i].MovieName);
				actualData.push(dataSet.movies[i].MovieNumber);
				ph = ph + "(?,?,?,?,?,?)";

				if (i === 79 || i === 159 || i === 239 || i === 319 || i === 399) {
					queryString + ph;
					ph = "";
					db.sqlBatch([
							[batchQ, actualData]
						],
						function() {
							console.log('Insert database OK');
						},
						function(error) {
							console.log('SQL batch insert ERROR: ' + error.message);
						}
					);
					batchQ = "";
				}
				ph = ph + ",";
			}
			
			ph = ph.slice(0, -1); 
			batchQ = queryString + ph;
			ph = "";
			db.sqlBatch([
					[batchQ, actualData]
				],
				function() {
					console.log('Insert database OK');
				},
				function(error) {
					console.log('SQL batch insert ERROR: ' + error.message);
				}
			);
			
			db.executeSql('SELECT count(*) AS mycount FROM DemoTable1', [], function(rs) {
				console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
			}, function(error) {
				console.log('SELECT SQL statement ERROR: ' + error.message);
			});*/
			
			this.setModel(new JSONModel({
				imagePath: jQuery.sap.getModulePath("ShallYou.images"),
				url: ""
			}), "global");
			// set the device model
			//	var sRootPath =jQuery.sap.getModulePath("ShallYou.images");
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});