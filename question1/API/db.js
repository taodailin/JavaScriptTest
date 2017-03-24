var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;

//Importing the required mongodb driver
var mongoClient = require('mongodb').MongoClient;


//MongoDB connection URL
var dbHost = 'mongodb://serviceaccount:serviceaccount@ds137220.mlab.com:37220/music';

//Name of the collections
const userCollection = "users";
const songsCollection="songs";
const artistCollection="artists";
const libraryCollection= "library";


exports.test = function(input){
	console.log(input);
	return input;
}

exports.updateUserProfile = function (userName, firstName, lastName,password,emailId, callbackMethod) {

    mongoClient.connect(dbHost, function (err, db) {
		db.collection(userCollection).insertOne({
        "firsName": firstName,
        "userName": userName,
        "lastName": lastName,
        "password": password,
        "emailId": emailId
    }), function (err, results) {
        if (err) throw err;

	};
	callbackMethod("logged in");
    });
}
exports.loginAndgetUserID = function (emailId, password, callbackMethod) {

    mongoClient.connect(dbHost, function (err, db) {
        db.collection(userCollection).findOne({
        "emailId": emailId,
        "password": password
    }, function (err, result) {
            if (result == null) 
                callbackMethod("Invalid Credentials")
            if (err) throw err;
            callbackMethod(result);
    });
   
    });
}
exports.viewAllSongs = function(callBack){
        
    // this is a asynchronous connection to the db 
    mongoClient.connect(dbHost, function(err, db){
        if ( err ) throw err;
         
        result = db.collection(songsCollection)
                 .find().toArray( function(err, doc){ 
                    console.log(doc.length);
                    callBack(doc);                  
                 });
                 
    });
}
exports.addSongToLibrary = function(userName,songId,callBack){
        
     mongoClient.connect(dbHost, function (err, db) {
         if ( err ) throw err;
        db.collection(libraryCollection).findOne({
        "userName": userName,
        "songId": songId
    }, function (err, results) {
        if (err) throw err;
        if(results==null){
            insertSong(userName,songId,callBack);
        }else{
        callBack("not Inserted");
    }

    });
    });
}
function insertSong(userName,songId,callBack){

     mongoClient.connect(dbHost, function (err, db) {
         if ( err ) throw err;
        db.collection(libraryCollection).insertOne({
        "userName": userName,
        "songId": songId
    }, function (err, results) {
        if (err) throw err;
           callBack("inserted");
    });
    });
}
exports.deleteSongFromLibrary = function(userName,songId,callBack){
        
     mongoClient.connect(dbHost, function (err, db) {
         if ( err ) throw err;
        db.collection(libraryCollection).remove({
        "userName": userName,
        "songId": songId
    }, function (err, results) {
            console.log(err);
        if (err) throw err;
        console.log(results.result.n);
        if(results.result.n!=0){
            callBack("deleted");
        }
        callBack("Not deleted");

    });
    });
}
exports.viewUserLibrary = function(userId,callBack){
        
    // this is a asynchronous connection to the db 
    mongoClient.connect(dbHost, function(err, db){
        if ( err ) throw err;
         
        result = db.collection(libraryCollection)
                 .find(
                    {
                        "userName":userId
                },{'songId':true, '_id': false}).toArray( function(err, doc){ 
                    console.log(doc.length);
                    callBack(doc);                  
                 });
                 
    });
}
exports.getSongsFromArtist = function(artistId,callBack){
        
    // this is a asynchronous connection to the db 
    mongoClient.connect(dbHost, function(err, db){
        if ( err ) throw err;
         
        result = db.collection(songsCollection)
                 .find(
                    {
                        "artist":parseInt(artistId)
                }).toArray( function(err, doc){ 
                    console.log(doc.length);
                    callBack(doc);                  
                 });
                 
    });
}
exports.getAllArtist = function(callBack){
        
    // this is a asynchronous connection to the db 
    mongoClient.connect(dbHost, function(err, db){
        if ( err ) throw err;
        result = db.collection(artistCollection)
                 .find().toArray( function(err, doc){ 
                    console.log(doc.length);
                    callBack(doc);                  
                 });
                 
    });
}
exports.findSongsOfUserLibrary = function(arr, callBack){
        
    // this is a asynchronous connection to the db 
     mongoClient.connect(dbHost, function(err, db){
        if ( err ) throw err;
         
        result = db.collection(songsCollection)
                 .find({"songId":{ $in: arr} }).toArray( function(err, doc){ 
                    console.log(doc.length);
                    callBack(doc);                  
                 });
                 
    });
}