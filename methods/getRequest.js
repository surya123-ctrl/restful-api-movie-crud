const getReq = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    // console.log(baseUrl);
    let id = req.url.split('/')[3];
    // console.log(id);
    const regexV4 = new RegExp(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
    if (req.url === '/api/movies' || req.url === '/api/movies/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if (!regexV4.test(id)) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify({ error: 'id Not valid' }));
        res.end();
    }
    else if (baseUrl === '/api/movies/' && regexV4.test(id)) {
        let filteredMovie = req.movies.filter((movie) => movie.id === id);
        if (filteredMovie.length > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ error: 'Movie not found' }));
            res.end();
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify({ error: 'Base Url is wrong' }));
        res.end();
    }
};
module.exports = getReq;