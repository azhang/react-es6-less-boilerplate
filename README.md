# JSPM React Less Boilerplate

## Features

- Package manager: [jspm](http://jspm.io)
- ES6 modules
- Web server with live reload using [BrowserSync](http://browsersync.io)
- Gulp
- Less
- CSS Autoprefixing and minification
- Unit tests: Karma, Mocha, Chai, Sinon
- Uglify JS


## Usage

- Clone the repo
- `npm install -g jspm`
- `npm install`
- `jspm install`
- Gulp tasks:
    - `gulp` To run the application on port 3000, watchin changes on js and less.
    - `gulp test` Shortcut to run karma, it of course can be run directly without gulp
    - `gulp dist` Make a distribution copy: Bundle the application in one JS file and minify it with Uglify, compile Less files and minify them, put everything in the dist directory.
- To load from html:

    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Hello World title</title>
        <link rel="stylesheet" href="dist/css/app.min.css" >
      </head>
      <body>
        <script src="dist/js/app.min.js"></script>
      </body>
    </html>