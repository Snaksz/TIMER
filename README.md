# static-timer

A minimal countdown timer built with plain HTML, CSS, and JavaScript. No
build step and no dependencies. You can open index.html directly in a
browser or serve the folder with any static file server.

## Features

- Set the countdown in minutes and seconds.
- Start, pause, resume, and reset.
- Dark theme designed to stay readable on small screens.

## Running it

Open the folder in a browser:

    # from this directory
    xdg-open index.html

Or serve it locally, for example with Python:

    python3 -m http.server 8000

Then visit http://localhost:8000 in your browser.

## Project layout

    index.html   Markup and page structure
    styles.css   Visual styling
    app.js       Timer logic

## License

MIT
