var helper = {
    fire: function(name, payload, callback) {
        var portVar = {
            port: {}
        };

        if (typeof addon !== 'undefined') {
            console.info("addon is defined");
            portVar = addon.port;
        }

        if (typeof self.port !== 'undefined') {
            console.info("self.port is defined");
            portVar = self.port;
        }

        var eventId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        // use the eventId to identify this event later on
        portVar.port.on(eventId, callback);

        // Fire event to backend
        portVar.port.emit("cs-event", {
            eventId: eventId,
            eventName: name,
            payload: payload
        });
    }
};

window.Exkit = helper;
