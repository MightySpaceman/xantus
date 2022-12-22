const WebSocket = require('ws');
const term = require('terminal-kit').terminal;
const sock = new WebSocket('ws://localhost:9000');

// Close the script when the user presses CTRL_C
term.on('key', function(name, matches, data) {
  if (name == "CTRL_C") { console.log("\nExited."), process.exit(); }
});

// When the connection is established, begin the sending loop (aka recursion fun fun time)
sock.onopen = function() {
  console.log('Socket succesfully connected.');
  mainLoop();
};

// Display received message when...well...it's received
sock.onmessage = function(event) {
  term.eraseLine();
  term.red(`<${sock._socket.remoteAddress}>: ${event.data}`);
  term.moveTo(1, term.height);
  term.green("\nYou: ");
};

// Main loop to be executed recursively
function mainLoop() {
  term.green("\nYou: ");
  term.inputField((error , input) => {
        sock.send(input);
        mainLoop();
    }
  );
}

