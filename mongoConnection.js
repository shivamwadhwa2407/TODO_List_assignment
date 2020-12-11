const mongoose = require('mongoose');
mongoose.Promise = Promise;

var MONGO_DB_CONNECTION_URL = "mongodb+srv://IamWaddy:EYBab42JsLGR7a7s@cluster-alpha.1vji7.mongodb.net/demoDatabase?authSource=admin&replicaSet=atlas-rx0n0v-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"; 
// this is URL used with credentials

function mongoConnect() {
    mongoose.connection.openUri(
        MONGO_DB_CONNECTION_URL,
        function(err) {
            if (err) {
                console.error("Error: ", err);
            }
            console.log("Connected.... Unless You See An Error The Line Before This..!!");
        });
    mongoose.set('debug', true);
}

module.exports = { mongoConnect }