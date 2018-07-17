const User =require('../models/User');
const Category =require('../models/Category');
const Post =require('../models/Post');
const Comment =require('../models/Comment');


/// Home Page
exports.homePage =async (request, response) => {

    let categories =await Category.find();
    
    let posts =await Post.find();

    return response.render('public/index', {
        categories,
        posts
    });

}

/// Register Page
exports.registerPage =async (request, response) => {

    let categories =await Category.find();

    return response.render('public/register', {
        categories
    });

}

/// Login Page
exports.loginPage =async (request, response) => {

    let categories =await Category.find();

    return response.render('public/login', {
        categories
    });

}

/// Single Post
exports.singlePost =async (request, response) => {

    let categories =await Category.find();
    
    let post =await Post.findOne({ '_id': request.params.id });

    /// post comments
    let comments =await Comment.find({'post': post._id});
    
    return response.render('public/single', {
        categories,
        post,
        comments
    });

}
/// Create single post comment
exports.createSinglePostComment =async (request, response) => {

    let comment =new Comment({
        post: request.body.post,
        user: request.body.user,
        text: request.body.text
    });

    comment =await comment.save();

    return response.redirect(`/single/${request.body.post}`);

}


/// Search Page
exports.searchPage =async (request, response) => {

    let search_query =request.body.keyword;

    let categories =await Category.find();
    
    let posts =await Post.find({'title': search_query});

    return response.render('public/search', {
        categories,
        posts,
        search_query
    });

}

/// Profile Page
exports.profilePage =async (request, response) => {
    
    let user =await User.findOne({'_id': request.params.id});
    let posts =await Post.find({ 'user': request.params.id });
    let comments =await Comment.find({ 'user': request.params.id });

    return response.render('public/profile', {
        user,
        posts,
        comments
    });

}