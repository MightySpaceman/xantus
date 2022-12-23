const WebSocket = require('ws');
const term = require('terminal-kit').terminal;

function server() {

const wss = new WebSocket.Server({ port: 9000 });
term.blue("Looking for connections...");

wss.on('connection', function connection(ws) {
  term.green(`\nSuccesful connection from ${ws._socket.remoteAddress}\n`)
  mainLoop(ws);
  ws.on('message', function incoming(message) {
    term.moveTo(1, term.height);
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

}

module.exports = { server };