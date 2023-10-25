const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        ref: "user",
    },
    email: {
        type: mongoose.Schema.Types.String,
        ref: "user",
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, collection: 'comments' });

const comments = mongoose.model('comments', commentsSchema)

module.exports = comments
