const express = require("express");
const app = express.Router();
const bodyParser = require('body-parser');
const loginModel = require("../models/loginModel");
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb','extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.post('/login', (req, res) => {
    let email = req.body.email.toLowerCase();
    let pass = req.body.password;
    loginModel.findOne({
        email: email,
    }).then(data => {
        if (data) {
            if (data.password == pass) {
                return res.status(200).json({
                    status: 200,
                    results: data
                })
            } else {
                return res.status(403).json({
                    status: 403,
                    message: 'password Incorrect'
                })
            }
        } else {
            return res.status(404).json({
                status: 404,
                message: "User Doesn't Exists"
            })
        }
    }).catch(err => res.status(500))
})

module.exports = app;