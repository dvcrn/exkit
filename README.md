# Introduction

Exkit (Extension Kit) is a framework for creating modern, javascript based cross-platform browser extensions. Write your extension once and compile it for opera, chrome and safari at the same time - without any extra effort!


# How does it work? 

Exkit tries to be a abstraction layer on top of the browser API. You communicate with exkit, exkit with your browser. Because of that, exkit can rapidly swap out the browser layer and replace it with a different one during build. Right now supported are: __opera__, __firefox__ and __chrome__.

# Getting started

1. Install exkit by running `npm install -g exkit`
2. Init your project by running `exkit init <project name>`. Exkit will attempt to install itself into the dir by running `npm install`. If you don't have a internet connection, this will fail
3. Run `exkit build` or `exkit build <firefox / chrome / opera` to compile

# Structure
Because exkit is a framework, you currently need to stick to the directory structure it requires.

- `src/` - is all your js code. must contain a `main.js` as your entry point. es6 is fully available here and will get transpiled into es5 javascript upon build
- `resources/` - all your resources as images, html fields and more
- `exkit.json` - must be in the project root. Configures exkit and provides config parameters for browser specific config jsons. __make sure to check the example exkit.json for configuring exkit__

# Functionality

Exkit is still in a very very early phase and will very likely miss features you need. Currently available are:

### `browser`: Interop for browser based functionalty

- `createTab(url)`: creates a new browser tab
- `setButtonIcon(fileurl)`: updates the icon to `<fileurl>`
- `setButtonLabel(text)`: sets the button label to `<text>`


### `event`: Browser independent event system
event is a global event system built on top of the browsers event system. Event can bind events that are getting emited by page-worker, and receives `exkit-button-clicked` on browserAction clicks. 

- `bind(name, callback)`: executes `<callback>` whenever `<name>` is getting fired. Callback is receiving a `payload` (data) and `answer` parameter. Answer is a function to pass a answer back to the event caller
- `fire(name, payload, callback)`: fires `<name>` with `<payload>` as data and `<callback>` for when the binding function calls `<answer>`. 


### `exkit`: Exkit framework functions
- `init()`: inits exkit 

# Future

Pull requests welcome!
