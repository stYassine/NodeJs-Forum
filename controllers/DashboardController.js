const Category =require('../models/Category');
const Role =require('../models/Role');
const Post =require('../models/Post');
const User =require('../models/User');
const Comment =require('../models/Comment');

////////////////////////////////////////////////////////////////////////////////////////////
/// Dashboard Page
////////////////////////////////////////////////////////////////////////////////////////////
exports.dashboardPage =async (request, response) => {

    let users =await User.find();
    let posts =await Post.find();
    let comments =await Comment.find();
    let categories =await Category.find();
    let roles =await Role.find();

    console.log(request.cookies.user);

    return response.render('admin/dashboard', {
        users: users,
        posts: posts,
        comments: comments
    });

}




////////////////////////////////////////////////////////////////////////////////////////////
/// Categories
////////////////////////////////////////////////////////////////////////////////////////////
/// All Categories
exports.allCategoriesPage =async (request, response) => {

    let categories =await Category.find();

    return response.render('admin/categories/index', {
        categories
    });

}
/// Create Category Page
exports.createCategoryPage =async (request, response) => {

    return response.render('admin/categories/create');

}
/// Create Category
exports.createCategory =async (request, response) => {

    let category =new Category({
        name: request.body.name
    });
    category =await category.save();

    return response.redirect('/admin/categories');

}
/// Edit Category Page
exports.editCategoryPage =async (request, response) => {

    let category =await Category.findOne({'_id': request.params.id});

    return response.render('admin/categories/edit', {
        category
    });

}
/// Edit Category
exports.editCategory =async (request, response) => {

    let id =request.params.id;
    let query ={
        name: request.body.name
    };

    let category =await Category.findByIdAndUpdate(id, query);

    return response.redirect('admin/categories/index');

}
/// Delete Category
exports.deleteCategory =async (request, response) => {

    let category =await Category.findByIdAndRemove(request.params.id);

    return response.redirect('/admin/categories');

}



////////////////////////////////////////////////////////////////////////////////////////////
/// Roles
////////////////////////////////////////////////////////////////////////////////////////////
/// All Roles
exports.allRolesPage =async (request, response) => {

    let roles =await Role.find();

    return response.render('admin/roles/index', {
        roles
    });

}
/// Create Role Page
exports.createRolePage =async (request, response) => {

    return response.render('admin/roles/create');

}
/// Create Role
exports.createRole =async (request, response) => {

    let role =new Role({
        name: request.body.name
    });
    role =await role.save();

    return response.redirect('/admin/roles');

}
/// Edit Role Page
exports.editRolePage =async (request, response) => {

    let role =await Role.findOne({'_id': request.params.id});

    return response.render('admin/roles/edit', {
        role
    });

}
/// Edit Role
exports.editRole =async (request, response) => {

    let id =request.params.id;
    let query ={
        name: request.body.name
    };

    let role =await Role.findByIdAndUpdate(id, query);

    return response.redirect('admin/role/index');

}
/// Delete Role
exports.deleteRole =async (request, response) => {

    let role =await Role.findByIdAndRemove(request.params.id);

    return response.redirect('/admin/roles');

}



////////////////////////////////////////////////////////////////////////////////////////////
/// Posts
////////////////////////////////////////////////////////////////////////////////////////////
/// All Posts
exports.allPostsPage =async (request, response) => {

    let posts =await Post.find();

    return response.render('admin/posts/index', {
        posts
    });

}
/// Create Post Page
exports.createPostPage =async (request, response) => {

    let categories =await Category.find();
    let users =await User.find();
    let posts =await Post.find();


    return response.render('admin/posts/create', {
        categories,
        users,
        posts
    });

}
/// Create Post
exports.createPost =async (request, response) => {

    let filename ='post_placeholder.png';

    if(request.files != null){

        let file =request.files.thumbnail;

        filename =Date.now()+file.name;

        file.mv('./public/uploads/thumbnails/'+filename, (err) => {
            if(err) return response.status(500).send(err);
        });

    }

    let post =new Post({
        category: request.body.category,
        user: request.body.user,
        is_active: request.body.is_active,
        title: request.body.title,
        thumbnail: filename,
        text: request.body.text
    });

    post =await post.save();

    return response.redirect('/admin/posts');

}
/// Edit Post Page
exports.editPostPage =async (request, response) => {

    let categories =await Category.find();
    let users =await User.find();
    let post =await Post.findOne({'_id': request.params.id});

    return response.render('admin/posts/edit', {
        categories,
        users,
        post
    });

}
/// Update Post
exports.editPost =async (request, response) => {

    let id =request.params.id;

    let query ={
        category: request.body.category,
        user: request.body.user,
        is_active: request.body.is_active,
        title: request.body.title,
        thumbnail: request.body.thumbnail,
        text: request.body.text
    };

    /// if thumbnails updated
    if(request.files != null){

        let file =request.files.thumbnail;

        let filename =Date.now()+file.name;

        file.mv('./public/uploads/thumbnails/'+filename, (err) => {
            if(err) return response.status(500).send(err);
        });

        query.thumbnail =filename;

    }

    let post =await post.findByIdAndUpdate(id, query);

    return response.redirect('/admin/posts');

}
/// Delete Post
exports.deletePost =async (request, response) => {

    let post =await Post.findByIdAndRemove(request.params.id);

    return response.redirect('/admin/posts');

}
/// Activate Post
exports.activatePost =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: true
    };

    let post =await Post.findByIdAndUpdate(id, query);

    return response.redirect('/admin/posts');

}
/// Disactivate Post
exports.disactivatePost =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: false
    };

    let post =await Post.findByIdAndUpdate(id, query);

    return response.redirect('/admin/posts');

}


////////////////////////////////////////////////////////////////////////////////////////////
/// User
////////////////////////////////////////////////////////////////////////////////////////////
/// All Users
exports.allUsersPage =async (request, response) => {

    let users =await User.find();

    return response.render('admin/users/index', {
        users
    });

}
/// Create User Page
exports.createUserPage =async (request, response) => {

    let roles =await Role.find();

    return response.render('admin/users/create', {
        roles
    });

}
/// Create User
exports.createUser =async (request, response) => {

    let filename ='avatar.jpg';

    if(request.files != null){

        let file =request.files.avatar;

        filename =Date.now()+file.name;

        file.mv('./public/uploads/avatars/'+filename, (err) => {
            if(err) return response.status(500).send(err);
        });

    }

    let user =new User({
        role: request.body.role,
        is_active: request.body.is_active,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        avatar: filename,
        password: request.body.password
    });

    user =await user.save();

    return response.redirect('/admin/users');

}
/// Edit User Page
exports.editUserPage =async (request, response) => {

    let roles =await Role.find();
    let user =await User.findOne({'_id': request.params.id});

    return response.render('admin/users/edit', {
        roles,
        user
    });

}
/// Edit User
exports.editUser =async (request, response) => {

    let id =request.params.id;

    let query ={
        role: request.body.role,
        is_active: request.body.is_active,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: request.body.password
    };

    if(request.body.password != null){
        query.password= request.body.password;   
    }

    if(request.files != null){

        let file =request.files.avatar;

        filename =Date.now()+file.name;

        file.mv('./public/uploads/avatars/'+filename, (err) => {
            if(err) return response.status(500).send(err);
        });

        user.avatar =filename;

    }

    let user =await User.findByIdAndUpdate(id, query);

    return response.redirect('admin/users/index');

}
/// Delete User
exports.deleteUser =async (request, response) => {

    let user =await User.findByIdAndRemove(request.params.id);

    return response.redirect('admin/posts/index');

}
/// Activate User
exports.activateUser =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: true
    };

    let user =await User.findByIdAndUpdate(id, query);

    return response.redirect('admin/users/index');

}
/// Disactivate User
exports.disactivateUser =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: false
    };

    let user =await User.findByIdAndUpdate(id, query);

    return response.redirect('admin/posts/index');

}




////////////////////////////////////////////////////////////////////////////////////////////
/// Comments
////////////////////////////////////////////////////////////////////////////////////////////
/// All Comments
exports.allCommentsPage =async (request, response) => {

    let comments =await Comment.find();

    return response.render('admin/comments/index', {
        comments
    });
    

}
/// Create Comment Page
exports.createCommentPage =async (request, response) => {

    let users =await User.find();
    let posts =await Post.find();

    return response.render('admin/comments/create', {
        users,
        posts
    });


}
/// Create Comment
exports.createComment =async (request, response) => {

    let comment =new Comment({
        post: request.body.post,
        user: request.body.user,
        is_active: request.body.is_active,
        text: request.body.text
    });
    
    comment =await comment.save();

    return response.redirect('/admin/comments');

}
/// Edit Comment Page
exports.editCommentPage =async (request, response) => {

    let comment =await Comment.findOne({'_id': request.params.id});
    let users =await User.find();
    let posts =await Post.find();

    return response.render('admin/comments/edit', {
        comment,
        users,
        posts
    });


}
/// Edit Comment
exports.editComment =async (request, response) => {

    let id =request.params.id;
    let query ={
        post: request.body.post,
        user: request.body.user,
        text: request.body.text
    };

    let comment =await Comment.findByIdAndUpdate(id, query);

    return response.redirect('admin/comments/index');

}
/// Delete Comment
exports.deleteComment =async (request, response) => {

    let comment =await Comment.findByIdAndRemove(request.params.id);

    return response.redirect('admin/comment/index');

}
/// Activate Comment
exports.activateComment =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: true
    };

    let comment =await Comment.findByIdAndUpdate(id, query);

    return response.redirect('admin/comments/index');

}
/// Disactivate Comment
exports.disactivateComment =async (request, response) => {

    let id =request.params.id;
    let query ={
        is_active: false
    };

    let comment =await Comment.findByIdAndUpdate(id, query);

    return response.redirect('admin/comments/index');

}