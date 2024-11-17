sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>broswer: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>broswer: CSS file
    deactivate server

    broswer->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>broswer: JavaScript file
    deactivate server 

    Note right of browser: Browser starts executing the JavaScript file to fetch notes from data.json and executes a event handler that renders the notes to the screen

    broswer->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>broswer: A list of notes in the json file
    deactivate server 

    broswer->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa.json
    activate server
    server->>broswer: The new note that was submitted
    deactivate server

    Note right of broswer: Browser saves the note that was entered without re-rendering the entire page.