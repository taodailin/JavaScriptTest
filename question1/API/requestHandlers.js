// import required modules 
//var http = require('http');
var http = require('request');
var db = require('./db.js');

// handler for creating profile
exports.createUserProfile = function (request, response, next) {

    try {
        var data = request.body;
        //console.log("posted data: " + JSON.stringify(data));
        // callback to send response to client 
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
		//console.log(data.body.userName);
		db.updateUserProfile(data.userName,data.firstName,data.lastName,data.password,data.email, sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for logging in and getting userid
exports.loginUser = function (request, response, next) {

    try {
        var data = request.body;
        // callback to send response to client 
        function sendResponse(result ) {
            if (result != null) {
                console.log(result);
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
        //console.log(data.body.userName);
        db.loginAndgetUserID(data.emailId,data.password,sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for getting all songs
exports.viewAllSongs = function (request, response, next) {

    try {

        // closure method used as a callback when data is fetched from mongo db
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
                
            }
            else
                response.send(401, "no records found");
            return next();
        }

        db.viewAllSongs(sendResponse);
    }
    catch (e) {
        console.log(e);
    }
}
// handler for adding song to user's library
exports.addSongToLibrary = function (request, response, next) {

    try {
        var data = request.body;
        console.log(request.body);
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
        db.addSongToLibrary(data.userName,data.songId,sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for deleting a song to user library
exports.deleteSongFromLibrary = function (request, response, next) {

    try {
        var data = request.body;
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
        console.log(data);
        db.deleteSongFromLibrary(data.userName,data.songId, sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for get songs from user library
exports.viewUserLibrary = function (request, response, next) {

    try {
        var userId=request.params.userId;
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
        //console.log(data.body.userName);
        db.viewUserLibrary(userId,sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for viewing song from Artist
exports.getSongsFromArtist = function (request, response, next) {
 try {
        var artistId=request.params.artistId;
        console.log(artistId);
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "");
            return next();
        }
        db.getSongsFromArtist(artistId,sendResponse);
    }
    catch (e) {
        console.log(JSON.stringify(e)+"error");
    }
}
// handler for getting all Artist
exports.getAllArtist = function (request, response, next) {

    try {
        // closure method used as a callback when data is fetched from mongo db
        function sendResponse(result) {
            if (result != null) {
                response.send(200, result);
            }
            else
                response.send(401, "no records found");
            return next();
        }
        db.getAllArtist(sendResponse);
    }
    catch (e) {
        console.log(e);
    }
}
