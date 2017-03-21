// load the required modules 

var restify = require('restify');
var handlers = require('./requestHandlers.js');

// create the server 
var server = restify.createServer();

// configure app to use bodyParser()
server.use(restify.bodyParser( {mapParams: false} ));
server.use(restify.queryParser());

// handler to run for all request prior to the end point
server.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

	next(); // make sure we go to the next routes and don't stop here
});

//default route ( accessed at GET http://localhost);
server.get('/', function (request, response, next) {
    response.send(200, "Response coming soon");
    return next(); // return the next handler to complete the request 
});


// add routes for the service end points 
server.post('/signUp', handlers.createUserProfile);
server.post('/login', handlers.loginUser);
server.get('/getSongs', handlers.viewAllSongs);
server.post('/addSongToLibrary', handlers.addSongToLibrary);
server.post('/deleteSongFromLibrary',handlers.deleteSongFromLibrary)
server.get('/getLibrary/:userId', handlers.viewUserLibrary);
server.get('/getartistSong/:artistId',handlers.getSongsFromArtist);
server.get('/getArtists',handlers.getAllArtist);



server.listen(80, function(){
	console.log('the music server is up on port 80');
})