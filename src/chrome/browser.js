var browser = {
    createTab: function(url) {
        Chrome.tabs.create({url: url});
    }
};

module.exports = browser;
