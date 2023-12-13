const writeToFile = require('../util/write-to-file')
const deleteRequest = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id = req.url.split('/')[3];
    const regexV4 = new RegExp(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
    if (!regexV4.test(id)) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify({ error: 'id Not valid' }));
        res.end();
    }
    else if (baseUrl === '/api/movies/' && regexV4.test(id)) {
        const index = req.movies.findIndex((movie) => movie.id === id);
        if (index !== -1) {
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            console.log("Movie Deleted Id: ", id)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(req.movies));
            res.end();
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ error: 'Movie not found' }));
            res.end();
        }
    }
}
module.exports = deleteRequest;