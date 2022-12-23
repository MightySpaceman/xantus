const WebSocket = require('ws');
const term = require('terminal-kit').terminal;

function client(ip, port) {

  term.blue("\nAttempting to connect...");

  const sock = new WebSocket(`ws://${ip}:${port}`);

  // When the connection is established, stop the spinner and begin the sending loop (aka recursion fun fun time)
  sock.onopen = function() {
    term.green('\nSocket succesfully connected.\n');
    mainLoop(sock);
  };

  // Display received message when...well...it's received
  sock.onmessage = function(event) {
    term.moveTo(1, term.height);
    term.red(`<${sock._socket.remoteAddress}>: ${event.data}`);
    term.moveTo(1, term.height);
    term.green("\n<You>: ");
  };

  // If the connection fails, try again after a short delay
  sock.onerror = function(error) {
    setTimeout(connect, 1000);
  };
}

// Main loop to be executed recursively
function mainLoop(sock) {
  term.green("\n<You>: ");
  term.inputField((error , input) => {
        sock.send(input);
        mainLoop(sock);
    }
  );
}

module.exports = { client };
