sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Image",
	"sap/m/Label"
], function(Control, Image, Label) {
	"use strict";
	return Control.extend("ShallYou.js.AttemptsIndicator", {
		metadata: {
			properties: {
				state: {
					type: "string",
					defaultValue: "right"
				},
				src: {
					type: "sap.ui.core.URI",
					defaultValue: ""
				},
				label: {
					type: "string",
					defaultValue: "  "
				}
				/*,
								width: {
									type: "	sap.ui.core.CSSSize",
									defaultValue: ""
								},
								height: {
									type: "	sap.ui.core.CSSSize",
									defaultValue: ""
								}*/
			},
			aggregations: {
				_image: {
					type: "sap.m.Image",
					multiple: false,
					visibility: "hidden"
				},
				_label: {
					type: "sap.m.Label",
					multiple: false,
					visibility: "hidden"
				}
			},
			events: {
				change: {
					parameters: {
						state: {
							type: "string"
						}
					}
				}
			}
		},
		init: function() {
			this.setAggregation("_image", new Image({
				src: this.getSrc(),
				load: this._onImageLoaded.bind(this)
			}).addStyleClass("customControlImage"));
			this.setAggregation("_label", new Label({
				textAlign: "Center",
				design: "Bold",
				text: ""
			}));
		},

		setState: function(iValue) {
			if (iValue === "wrong") {
				this.getAggregation("_image").setSrc("");
				this.getAggregation("_label").setText("a");
			}
			this.setProperty("state", iValue, true);
		},

		setSrc: function(iValue) {
			this.setProperty("src", iValue, true);
			this.getAggregation("_image").setSrc(iValue);
		},

		setLabel: function(iValue) {
			this.setProperty("label", iValue, true);
			this.getAggregation("_label").setText(iValue);
		},

		_onImageLoaded: function(oEvent) {
			/*var oRessourceBundle = this.getModel("i18n").getResourceBundle();
			var fValue = oEvent.getParameter("value");

			this.setValue(fValue);

			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold");*/
		},

		renderer: function(oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("customControlWrapperDiv");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_label"));
			oRM.renderControl(oControl.getAggregation("_image"));
			oRM.write("</div>");
		}
	});
});