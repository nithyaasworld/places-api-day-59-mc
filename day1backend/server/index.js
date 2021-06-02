const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log('Request received');
    console.log(request.url);

    response.setHeader('Content-type', 'text/html');
    response.statusCode = 201;
    // response.write(`<h1>Hello from backend</h1>`);
    // response.write('<p>hi from p tag</p>');
    // response.write('<title>node js server</title>');

    let fileToSend = request.url === '/' ? './views/index.html' : request.url === '/about' ? './views/about.html' : './views/404.html'
         fs.readFile(fileToSend, (err, data) => {
            if (err) {
                console.log(err);
                response.write(err);
                response.end();
            }
            response.write(data);
            response.end();
        })

    // response.end();
    // if (request.url === '/end') {
    //     server.close((err) => console.log(err));
    //     response.end();
    // }
});
server.listen(8000, 'localhost', () => {
    console.log('server is listening on 8000');
})