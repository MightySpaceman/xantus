const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const term = require('terminal-kit').terminal;
const app = express(); 

const server = require('./server').server;
const client = require('./client').client;

const port = 8000;

// Close the script when the user presses CTRL_C
term.on('key', function(name, matches, data) {
    if (name == "CTRL_C") { term.red("\nExited.\n"), process.exit(); }
});

const logo = `
__  __           _             
\\ \\/ /__ _ _ __ | |_ _   _ ___ 
 \\  // _\` | '_ \\| __| | | / __|
 /  \\ (_| | | | | |_| |_| \\__ \\
/_/\\_\\__,_|_| |_|\\__|\\__,_|___/`

term.magenta(logo, " v0.0.1\n\n");

const menuOptions = ["Scan for rooms", "Join specific IP", "Host room"];
term.singleColumnMenu(menuOptions, (error, response) => {
    switch (response.selectedText) {
        case "Scan for rooms": 
        client("127.0.1.1");

        break;
        
        case "Join specific IP":
            term.blue("\nIP adress: ")
            term.inputField((error, input) => {
                    client(input);
            });
            break;
            
        case "Host room":
            server();

            break;
    }
});