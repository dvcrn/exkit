var event = {
    _handlers: {},
    _initListeners: function() {
        (function(_this) {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.eventName in _this._handlers) {
                    _this._handlers[request.eventName].forEach(function(handler) {
                        handler(request.payload, sendResponse);
                    });
                }
            });
        })(this);
    },
    bind: function(name, callback) {
        if (this._handlers[name] === undefined) {
            this._handlers[name] = [];
        }

        this._handlers[name].push(callback);
    },
    fire: function(name, payload, callback) {
        if (name in this._handlers) {
            this._handlers[name].forEach(function(handler) {
                handler(payload, function (data) {
                    callback(data);
                });
            });
        }
    }
};

module.exports = event;
