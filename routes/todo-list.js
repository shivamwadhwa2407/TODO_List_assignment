const express = require("express");
const app = express.Router();
const bodyParser = require('body-parser');
const todoListModel = require("../models/todoList");
const loginModel = require("../models/loginModel");
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb','extended':'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const ObjectID = require("mongodb").ObjectID;


app.get('/get-todo-list/:userId', (req,res) => {
    
    let userId = new ObjectID(req.params.userId);
    todoListModel.find({ userId: userId}).sort({updatedOn:-1}).then( data => {
        if (data && data.length > 0 ) {
            return res.status(200).json({
                status: 200,
                results: data
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "No List For Particular User"
            })
        }
    }).catch( err => {
        return res.status(500) .json(
            {
                status: 500,
                message: 'Errored Was Occured'
            }
        )
    })
})

app.post('/addto-todo-list', (req, res) => {
    // console.log("HERE")
    let userId = new ObjectID(req.body.userId);
    console.log(typeof(userId))
    let obj = {
        "userId" : userId,
        "description" : req.body.description.toLowerCase()
    }
    console.log(obj);
    todoListModel.create(obj).then( data => {
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Success"
            })
        } 
    }).catch( err => {
        return res.status(500)
    })
})

app.delete('/deleteFrom-todo-list/:id', (req, res) => {
    let _id = new ObjectID(req.params.id);
    todoListModel.findByIdAndRemove( _id ).then(data => {
        if (data){
            return res.status(200).json({
                status: 200,
                message: "Record Delete",
                data: data
            })   
        } else {
            return res.status(404).json(
                {
                    status: 404,
                    message: "No LIST ITEM FOUND"
                }
            )
        }
    }).catch(err => res.status(500))

})

app.post('/updateFrom-todo-list', (req, res) => {
    let _id = new ObjectID( req.body.id);
    
    let obj = {}
    if (req.body.description) {
        obj['description'] = req.body.description
    } 
    if (req.body.status){
        obj['status'] = req.body.status == 2 || req.body.status == 1 || req.body.status == 0 ? req.body.status : 0
    }
    if (req.body.statusDescription) {
        obj['statusDescription']= obj['status'] == 2 ? "Completed" : obj['status'] == 1 ? "In-Progress" : obj['status'] == 0 ? "To-Do" : req.body.statusDescription;
    }
    obj["updatedOn"] = new Date();
    
    todoListModel.update( {
        "_id": _id
    }, { 
        $set: obj
    }).then( data => {
        return res.status(200).json({
            status: 200,
            message: "List Item Updated",
        })
    }).catch(
        err => {
            console.log(err);
            return res.status(500)
        }
    )
})


module.exports = app;