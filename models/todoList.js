const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({

    userId: {
        type: ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 0
    },
    statusDescription: {
        type: String,
        default : "To-Do"
    },
    createdOn: Date,
    updatedOn: Date,

});

todoSchema.pre('save', function(next) {
    var list = this;
    list.createdOn = new Date().toISOString();
    list.updatedOn = new Date().toISOString();
    next();
});

var todoListModel = mongoose.model('todoList', todoSchema, 'todoList');
module.exports = todoListModel;
