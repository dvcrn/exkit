var event = require('./event');

var exkit = {
    init: function() {
        event._initListeners();
    }
};

module.exports = exkit;
