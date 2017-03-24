var readline = require('readline');
var lineNumber = 0;
var numOfUser;
var userAndSongs=[];
var useridForFollower;
const HashMap = require('hashmap');
var followerMap = new HashMap();
var songMap=new HashMap();

var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', readLine); 
function readLine (line) {
    if (lineNumber == 0) {
        if (!isNaN(parseInt(line))) {
            numOfUser = parseInt(line);
            lineNumber++;
        } else {
            console.log("Invalid Input");
        }
    } else if(lineNumber<=numOfUser*2 && lineNumber%2!=0) {
        userAndSongs = line.split(" ");   
        if (userAndSongs.length != 2) {
                console.log("Given more/less than " + numOfUser + " Try again");
        }
        else{
        lineNumber++;
        }
    }
    else if(lineNumber<=numOfUser*2 && lineNumber%2==0){
        var songs=line.split(" ");
        if(songs.length!=userAndSongs[1]){
            console.log("Please enter correct number of songs");
        }
        else{
            insertSongToHashMap(songs,userAndSongs[0]);
            lineNumber++;
        }
    }
    else if(lineNumber>numOfUser*2 && lineNumber%2!=0&& lineNumber<=numOfUser*4 ){
        useridForFollower=line;
        lineNumber++;
    }
    else if(lineNumber>numOfUser*2 && lineNumber%2==0 && lineNumber<=numOfUser*4){
        var followers=line.split(" ");
        followerMap.set(useridForFollower,followers);
        lineNumber++;
    }
    else{
        var userIdSongId=line.split(" ");
        computeResult(userIdSongId[0],userIdSongId[1]);
        process.exit();
}

        
}
function insertSongToHashMap(songs,user){
    for (var i = 0;i<= songs.length; i++) {
             if(songMap.has(songs[i])){
                var uList=songMap.get(songs[i]);
                uList.push(user);
                songMap.remove(songs[i]);
                songMap.set(songs[i],uList);
             } else{
                songMap.set(songs[i],[userAndSongs[0]]);
             }
            }
}
function computeResult(userid,songid){
    var listOfUsersForSong=songMap.get(songid);
        var listOfFollower=followerMap.get(userid);
        var network=listOfFollower;
        for (var i = listOfFollower.length - 1; i >= 0; i--) {
            if(followerMap.has(listOfFollower[i])){
           network= network.concat(followerMap.get(listOfFollower[i]));
       }
        }
       
        var uniqueNetwork=removeReduntantValues(network,userid);
        var userWithSong=listOfUsersForSong.filter(function(n) {
          return uniqueNetwork.indexOf(n) !== -1;
       });
        for (var i = userWithSong.length - 1; i >= 0; i--) {
            console.log(userWithSong[i]);
        }

}
    function removeReduntantValues(array,userid) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        if(a[i]==userid){
            a.splice(i,1)
        }
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
