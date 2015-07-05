var browser = require('./exkit/browser');
var exkit = require('./exkit/exkit');
var event = require('./exkit/event');

console.info("Welcome to ExKit!");

// Make sure to keep this line in to let exkit init it's stuff
exkit.init();

event.bind("google-attached", function(payload, answer) {
    console.info("A page worker just attached at " + payload);
    answer("Hello page-worker. This is main.js. Nice to meet you!");
});

event.bind("exkit-button-clicked", function() {
    console.info("you clicked the button!!!!");
});

browser.createTab("http://google.com");
