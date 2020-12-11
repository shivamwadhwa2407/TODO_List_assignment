var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var loginData = new Schema({


    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
    },
    phone: Number,
    city: String,
    pincode: String,
    address: String,
    createdOn: Date

});

//convert the password to hash before inserting into db
loginData.pre('save', function(next) {
    var user = this;
    user.password = hash;
    user.createdOn = new Date().toISOString();
    next();
});

var loginModel = mongoose.model('loginModel', loginData, 'loginModel');
module.exports = loginModel;
