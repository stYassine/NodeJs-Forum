const mongoose =require('mongoose');

const postSchema =new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'categories'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'users'
    },
    is_active: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 190
    },
    thumbnail: {
        type: String
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

const Post =mongoose.model('posts', postSchema);


module.exports =Post;