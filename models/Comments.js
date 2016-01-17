var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, defaults: 0},
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }
});

mongoose.model('Comment', CommentSchema);
