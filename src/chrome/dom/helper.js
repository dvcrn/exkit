var helper = {
    fire: function(name, payload, callback) {
        chrome.runtime.sendMessage({
            eventName: name,
            payload: payload
        }, callback);
    }
};

window.Exkit = helper;
