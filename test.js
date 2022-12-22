const terminal = require('terminal-kit').terminal;

// Create a 2x1 grid with the top row taking up 2/3 of the terminal height and the bottom row taking up 1/3
const grid = terminal.grid({
  rows: 2,
  cols: 1,
  y: 0,
  x: 0,
  height: Math.floor(terminal.height * 2 / 3),
  width: terminal.width
});

// Set the top cell to be a terminal.screen buffer, which allows you to print text to it
const topCell = grid.set(0, 0, terminal.screenBuffer, {});

// Set the bottom cell to be a terminal.inputField, which allows you to input text
const bottomCell = grid.set(1, 0, terminal.inputField, {});

// Set a listener for the "submit" event on the input field, which is emitted when the user presses Enter
bottomCell.inputField.on('submit', (input) => {
  // Print the user's input to the top cell
  topCell.screenBuffer.puts(input);
  topCell.screenBuffer.draw();

  // Clear the input field
  bottomCell.inputField.clearValue();
});
