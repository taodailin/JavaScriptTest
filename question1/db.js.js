var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;

//Importing the required mongodb driver
var mongoClient = require('mongodb').MongoClient;


//MongoDB connection URL
var dbHost = 'mongodb://nyu:nyu@ds153699.mlab.com:53699/owe';

//Name of the collections
var userCollection = "user";


exports.test = function(input){
	console.log(input);
	return input;
}

exports.updateUserProfile = function (userName, firstName, lastName,password,emailId, callbackMethod) {

    mongoClient.connect(dbHost, function (err, db) {		
		db.collection('user').insertOne({
        "firsName": firstName,
        "userName": userName,
        "lastName": lastName,
        "password": password,
        "emailId": emailId
    }), function (err, results) {
        if (err) throw err;

	};
	callbackMethod(null);
    });
}


