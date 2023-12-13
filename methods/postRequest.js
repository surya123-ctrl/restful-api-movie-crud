const crypto = require('crypto');
const requestBodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');
const postReq = async (req, res) => {
    if (req.url === '/api/movies') {
        try {
            let body = await requestBodyParser(req);
            console.log("Request body : ", body)
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(body));
            res.end();
        }
        catch (err) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ error: err }));
            res.end();
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify({ error: 'Not found' }));
        res.end();
    }
}
module.exports = postReq;