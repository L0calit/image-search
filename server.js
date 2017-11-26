var express = require('express');
var app = express();
var offset = 1;
var https = require('https');
var options = {
  url: "",
  method: "GET",
  timeout: 10000
};
   

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var format = require('util').format;
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
//(Focus on This Variable)
var url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
//(Focus on This Variable)

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // do some work here with the database.
    db.listCollections().toArray(function(err, collections){
        if (err) throw err;
        var test = true;
        for (var collection in collections) {
         if (collection == "latestSearch") {
           test = false;
         }
       }
        if (test) {
            db.collection("latestSearch");
        }
        //Close connection
        db.close();
    });
  }
});
var requests_library = require('request');

app.use(express.static('public'));

app.get("/api/imagesearch/*?offset=*", function (request, response) {
  var search = request.params[0];
  var offset = request.params[1];
  options.url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_KEY + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + search + '&start=' + offset;

  requests_library(options, function(err, res, body) { 
    if (err) {
      throw err;
    }
    ajout(search);
    var result = JSON.parse(body);
    for (var i = 0; i < 10; i++) {
      reponseSearch[i].url = result.items[i].link;
      reponseSearch[i].snippet = result.items[i].snippet;
      reponseSearch[i].thumbnail = result.items[i].image.thumbnailLink;
      reponseSearch[i].context = result.items[i].image.contextLink;
    }
    response.send(reponseSearch);
  });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/imagesearch/*", function (request, response) {
  var search = request.params[0];
  var offset = 1;
    options.url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_KEY + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + search + '&start=' + offset;

  requests_library(options, function(err, res, body) { 
    if (err) {
      throw err;
    }
    ajout(search);
    var result = JSON.parse(body);
    for (var i = 0; i < 10; i++) {
      reponseSearch[i].url = result.items[i].link;
      reponseSearch[i].snippet = result.items[i].snippet;
      reponseSearch[i].thumbnail = result.items[i].image.thumbnailLink;
      reponseSearch[i].context = result.items[i].image.contextLink;
    }
    response.send(reponseSearch);
  });
});

app.get("/", function (request, response) {
  var search = "bonjour";
  var offset = 1;
    options.url = 'https://www.googleapis.com/customsearch/v1' + '?key=' + process.env.CSE_KEY + '&cx=' + process.env.CSE_ID + '&searchType=image' + '&q=' + search + '&start=' + offset;
  requests_library(options, function(err, res, body) { 
    if (err) {
      throw err;
    }
  ajout(search);
    var result = JSON.parse(body);
    for (var i = 0; i < 10; i++) {
      reponseSearch[i].url = result.items[i].link;
      reponseSearch[i].snippet = result.items[i].snippet;
      reponseSearch[i].thumbnail = result.items[i].image.thumbnailLink;
      reponseSearch[i].context = result.items[i].image.contextLink;
    }
    response.send(reponseSearch);
  });
});

app.get("/api/latest/imagesearch/", function (request, response) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        // do some work here with the database.
        db.collection('latestSearch').find({}).toArray(function (err, res) {
          if (err) throw err;
          var reponse = [];
          for (var i = 0; i < res.length; i++) {
            reponse.push({term: res[i].term, when: res[i].when});
          }
          db.close();
          var envers = reponse.reverse();
          response.send(envers);
        });
        //Close connection
      }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var reponseLatest = [
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  },
  {
    "term": null,
    "when": null
  }
];

var reponseSearch = [
  {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
  {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
   {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
   {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
  {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
  {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
  {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
   {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
   {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  },
   {
    "url": null,
    "snippet": null,
    "thumbnail": null,
    "context": null
  }
];

function ajout(search) { 
  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        // do some work here with the database. 
        var currentDate = new Date();
        db.collection('latestSearch').count(function (err, nbDoc) {
        if (nbDoc >= 10) {
          db.collection('latestSearch').find({}).toArray(function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              reponseLatest[i].term = res[i].term;
              reponseLatest[i].when = res[i].when;
            }
            reponseLatest.shift();
            reponseLatest.push({ term: search, when: currentDate 
});
            db.collection('latestSearch').deleteMany({},function(err, removed){
              console.log("all documents deleted");
              db.collection('latestSearch').insertMany(reponseLatest, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
              });
    });
            
          });
        } else {
        var myobj = { term: search, when: currentDate };
        db.collection("latestSearch").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
        }
        });
        //Close connection
      }
  });
}