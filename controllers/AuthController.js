const bcrypt =require('bcrypt');
const User =require('../models/User');
const Category =require('../models/Category');


/// Login
exports.login =async (request, response) => {

    let errors =[];
    
    if(!request.body.email){
        errors.push({msg: 'Email Is Invalid'});
    }
    if(!request.body.password){
        errors.push({msg: 'Password Is Invalid'});
    }

    let user =await User.findOne({'email': request.body.email });

    if(!user){
        errors.push({msg: 'Email Is InValid'});
    }

    ///let password_match =bcrypt.compare(request.body.password, user.password);

    // if(!password_match){
    //     errors.push({msg: 'Password Is Incorrect'});
    // }

    if(errors.length > 0){
        
        let categories =await Category.find();

        return response.render('public/login', {
            categories,
            errors
        });

    }else{

        request.cookies.user =user;

        console.log(request.cookies.user);
        
        return response.redirect('/login');

        /// Test
        ///console.log(user);

    }

}

/// Register
exports.register =async (request, response) => {

    let errors =[];

    let email_exists =await User.findOne({'email':  request.body.email});

    if(email_exists){
        errors.push({msg: 'Email Already Exists'});
    }
    if(!request.body.first_name){
        errors.push({msg: 'First Name Is Invalid'});
    }
    if(!request.body.last_name){
        errors.push({msg: 'Last Name Is Invalid'});
    }
    if(!request.body.email){
        errors.push({msg: 'Email Is Invalid'});
    }
    if(!request.body.password){
        errors.push({msg: 'Password Is Invalid'});
    }
    if(request.body.confirm_password != request.body.confirm_password){
        errors.push({msg: 'Passwords Do Not Match'});
    }

    if(errors.length > 0){
        
        let categories =await Category.find();

        return response.render('public/register', {
            categories,
            errors
        });

    }else{

        /// default avatar
        let profile_avatar ='avatar.jpg';

        let user =new User({
            role: request.body.role,
            avatar: profile_avatar,
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            password: request.body.password
        });

        user =await user.save();

        return response.redirect('/login');

}

}

//// Logout
exports.logout =async (request, response) => {




}