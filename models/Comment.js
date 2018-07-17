const mongoose =require('mongoose');

const commentSchema =new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'posts'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'users'
    },
    is_active: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        required: true,
        minlength: 3
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Comment =mongoose.model('comments', commentSchema);


module.exports =Comment;