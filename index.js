const express = require('express');
const app = express(); 

const port = 8000;

app.get("/uptime", (req, res) => {
    res.status(200);
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Listening for connections on port ${port}...`);
});