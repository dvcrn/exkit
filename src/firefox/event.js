var event = {
    _handlers: {},
    _handlePort: function(port) {
        (function(_this, port) {
            port.on("cs-event", function(event) {
                console.info("Received event: ");
                console.info(event);

                if (event.eventName in _this._handlers) {
                    _this._handlers.forEach(function(handler) {
                        // Execute registered handlers
                        // Second argument is a callback to pass an answer to the frontend
                        handler(event.payload, function (data) {
                            port.emit(event.eventId, data);
                        });
                    });
                }
            });
        })(this, port);
    }
};

module.exports = event;
