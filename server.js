const WebSocket = require('ws');
const term = require('terminal-kit').terminal;

const wss = new WebSocket.Server({ port: 9000 });

// Close the script when the user presses CTRL_C
term.on('key', function(name, matches, data) {
  if (name == "CTRL_C") { console.log("\nExited."), process.exit(); }
});


wss.on('connection', function connection(ws) {
  mainLoop(ws);
  ws.on('message', function incoming(message) {
    term.eraseLine();
    term.red(`<${ws._socket.remoteAddress}>: ${message}`);
    term.moveTo(1, term.height);
    term.green("\n<You>: ");
  });
});

// Main loop to be executed recursively
function mainLoop(ws) {
  term.green("\n<You>: ");
  term.inputField((error , input) => {
        ws.send(input);
        mainLoop(ws);
    }
  );
}