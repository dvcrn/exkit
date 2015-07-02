var event = {
    _handlers: {},
    _handlePort: function(port) {
        (function(_this, port) {
            port.on("cs-event", function(event) {
                if (event.eventName in _this._handlers) {
                    _this._handlers[event.eventName].forEach(function(handler) {
                        // Execute registered handlers
                        // Second argument is a callback to pass an answer to the frontend
                        handler(event.payload, function (data) {
                            port.emit(event.eventId, data);
                        });
                    });
                }
            });
        })(this, port);
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
