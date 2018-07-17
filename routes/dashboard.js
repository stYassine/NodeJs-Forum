const express = require('express');
const router = express.Router();
const DashboardController =require('../controllers/DashboardController');


router.all('/*', (request, response, next) => {

    response.app.locals.layout ='admin';

    next();

});

////////////////////////////////////////////////////
/// dashboard
////////////////////////////////////////////////////
router.get('/', DashboardController.dashboardPage);



////////////////////////////////////////////////////
/// Categories
////////////////////////////////////////////////////
/// All Categories Page
router.get('/categories', DashboardController.allCategoriesPage);
/// Create Category Page
router.get('/categories/create', DashboardController.createCategoryPage);
/// Create Category
router.post('/categories/create', DashboardController.createCategory);
/// Edit Category Page
router.get('/categories/edit/:id', DashboardController.editCategoryPage);
/// Edit Category
router.put('/categories/edit/:id', DashboardController.editCategory);
/// Delete Category
router.delete('/categories/delete/:id', DashboardController.deleteCategory);


////////////////////////////////////////////////////
/// Roles
////////////////////////////////////////////////////
/// All Roles Page
router.get('/roles', DashboardController.allRolesPage);
/// Create Role Page
router.get('/roles/create', DashboardController.createRolePage);
/// Create Role
router.post('/roles/create', DashboardController.createRole);
/// Edit Role Page
router.get('/roles/edit/:id', DashboardController.editRolePage);
/// Edit Role
router.put('/roles/edit/:id', DashboardController.editRole);
/// Delete Role
router.delete('/roles/delete/:id', DashboardController.deleteRole);


////////////////////////////////////////////////////
/// Users
////////////////////////////////////////////////////
/// All Users Page
router.get('/users', DashboardController.allUsersPage);
/// Create User Page
router.get('/users/create', DashboardController.createUserPage);
/// Create User
router.post('/users/create', DashboardController.createUser);
/// Edit User Page
router.get('/users/edit/:id', DashboardController.editUserPage);
/// Edit post
router.put('/users/edit/:id', DashboardController.editUser);
/// Delete User
router.delete('/users/delete/:id', DashboardController.deleteUser);
/// Activate User
router.post('/users/activate/:id', DashboardController.activateUser);
/// DisActivate User
router.post('/users/disactivate/:id', DashboardController.disactivateUser);



////////////////////////////////////////////////////
/// Posts
////////////////////////////////////////////////////
/// All Posts Page
router.get('/posts', DashboardController.allPostsPage);
/// Create post Page
router.get('/posts/create', DashboardController.createPostPage);
/// Create post
router.post('/posts/create', DashboardController.createPost);
/// Edit post Page
router.get('/posts/edit/:id', DashboardController.editPostPage);
/// Edit post
router.put('/posts/edit/:id', DashboardController.editPost);
/// Delete post
router.delete('/posts/delete/:id', DashboardController.deletePost);
/// Activate post
router.post('/posts/activate/:id', DashboardController.activatePost);
/// DisActivate post
router.post('/posts/disactivate/:id', DashboardController.disactivatePost);


////////////////////////////////////////////////////
/// Comments
////////////////////////////////////////////////////
/// All Comments Page
router.get('/comments', DashboardController.allCommentsPage);
/// Create comment Page
router.get('/comments/create', DashboardController.createCommentPage);
/// Create comment
router.post('/comments/create', DashboardController.createComment);
/// Edit comment Page
router.get('/comments/edit/:id', DashboardController.editCommentPage);
/// Edit comment
router.put('/comments/edit/:id', DashboardController.editComment);
/// Delete comment
router.delete('/comments/delete/:id', DashboardController.deleteComment);
/// Activate comment
router.post('/comments/activate/:id', DashboardController.activateComment);
/// DisActivate comment
router.post('/comments/disactivate/:id', DashboardController.disactivateComment);



module.exports =router;