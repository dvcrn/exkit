var tabs = require("sdk/tabs");
var ui = require("sdk/ui");
var self = require("sdk/self");
var actionbutton = require("sdk/ui/button/action");
var event = require("./event");

var extensionButton = null;

var browser = {
    _buttonProperties: {
        id: "exkit-actionbutton",
        label: "Exkit Button",
        icon: "",
        onClick: function() {
            event.fire("exkit-button-clicked");
        }
    },
    _generateButton: function() {
        if (extensionButton !== null) {
            extensionButton.destroy();
        }

        extensionButton = actionbutton.ActionButton(this._buttonProperties);
    },
    _setButton: function(config) {
        Object.keys(config).forEach(function (key) {
            if (key == "icon") {
                config[key] = self.data.url(config[key]);
            }

            this._buttonProperties[key] = config[key];
        }, this);

        this._generateButton();
    },
    createTab: function(url) {
        tabs.open({
            url: url
        });
    },
    setButtonIcon: function(url) {
        this._buttonProperties['icon'] = self.data.url(url);
        this._generateButton();
    },
    setButtonLabel: function(text) {
        this._buttonProperties['label'] = text;
        this._generateButton();
    }
};

module.exports = browser;
