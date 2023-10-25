const comments = require('../models/comments')
const mongoose = require('mongoose')
//Create comments
exports.createComments = async (req, res) => {
    let username = req.query.username;
    const movie_id = req.params.movie_id;
    const text = req.body.text;
    const newComment = new comments({
        name: username,
        movie_id: movie_id,
        text: text,
    })
    try {
        await newComment.save();
        res.status(201).json({ newComment, msg: 'New comment added!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
//GET ONE LIST
exports.getUsersComment = async (req, res) => {
    let username = req.query.useraname;
    const commentId = req.params.comment_id;
    try {
        const comment = await comments.find({ _id: commentId });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET ALL COMMENTS FOR MOVIE
exports.getMovieComment = async (req, res) => {
    const movie_id = new mongoose.Types.ObjectId(req.params.movie_id);
    try {
        const comment = await comments.aggregate([
            {
                $match: {
                    'movie_id': movie_id
                }
            },
            {
                $sort: {
                    'date': -1
                }
            }
        ]);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Update list
exports.updateComment = async (req, res) => {
    const id = req.params.comment_id;
    const text = req.body.text;
    try {
        const updateComments = await comments.updateOne(
            { _id: id },
            { text: text },
            { new: true }
        )
        res.status(200).json({ updateComments, msg: 'Comment has been added updated!' });
    } catch (err) {
        res.status(500).json(err);
    }
};


//DELETE ONE COMMENT
exports.deleteOneComment = async (req, res) => {
    const id = req.params.comment_id;
    try {
        const comment = await comments.findOneAndDelete({ _id: id });
        res.status(200).json({ comment, msg: "Comment has been deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};
