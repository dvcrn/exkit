var exkit = {
    init: function() {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            console.info("testtesttest");
            console.info(request);
        });
    }
};

module.exports = exkit;
