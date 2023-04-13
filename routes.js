const fs = require('fs');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if ( url === '/hello'){
        res.write('<html>');
        res.write('<head><title>Welcome</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form></body>');
        res.write('<html>');
        return res.end(); //We have to return this or else we will get an error as it will go default codebase
    }
    if ( url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => { // In Nodejs it reads thru data streams and at any given point in time this event is fired whenever there is data to be read
            console.log(chunk);
            body.push(chunk); // Whenever a chunk is received its pushed to the body being created
        });
        // req.on('end', () => {// This is triggered when the req.body parsing is over and the whole chunk has been received 
        //     const parsedBody = Buffer.concat(body).toString(); // The whole chunk is passed on to Buffer as is then converted to string
        //     const message = parsedBody.split('=')[1];
        //     fs.writeFileSync('message.txt', message);// Synchronously write the data received in the file
        // });
        // res.statusCode = 302; // 302 is required to redirect requests to a different URL
        // res.setHeader('Location', '/'); 
        // return res.end();

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // The whole chunk is passed on to Buffer as is then converted to string
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => { // Writing the files asynchronously
                res.statusCode = 302; // 302 is required to redirect requests to a different URL
                res.setHeader('Location', '/'); 
                return res.end();
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome</title></head>');
    res.write('<body><h1>Sorry add some param</h1></body>');
    res.write('<html>');
    res.end();
    
}

// module.exports = { // We can create an object a pass parameters as object keys
//     handler: requestHandler,
//     randomText: "Hello World"
// } 

exports.handler = requestHandler;
exports.randomText = "Hello World"
    