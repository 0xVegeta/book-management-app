const http = require("http");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");

const { app } = require("./app");
const server = http.createServer(app);

server.listen(port, () => {
	console.log(`
    =======================================================

        Started Server on
        Port Number : ${port}

    =======================================================
    `);
});
