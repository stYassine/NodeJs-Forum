const User =require('../models/User');
const Post =require('../models/Post');
const Category =require('../models/Category');
const Role =require('../models/Role');

module.exports ={
    formateDate: function(unformatedDate){

    },
    getUserObjectById:function(userId){

        User.findOne({'_id': userId}, function(err, response){
            console.log(response.email);
            return 'response.email';
        });

    },
    getPostObjectById: function(postId){

    },
    getRoleObjectById: function(roleId){

    },

};