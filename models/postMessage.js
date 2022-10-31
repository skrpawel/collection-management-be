const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: { String },
    description: { String },
    author: { String },
    tags: [String],
    selectedFile: { String },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model("PostMessage", postSchema);
module.exports = PostMessage;