const http = require('http');
const fs = require('fs');

const host = '192.0.2.123';
const port = 8080;

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`);
});

function httpHandler(req, res) {
    fs.readFile('./' + req.url, function (err, data) {
        if (err === null ) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}