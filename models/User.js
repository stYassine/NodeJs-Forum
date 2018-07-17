const mongoose =require('mongoose');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const SECRET ='supersecret';

const userSchema =new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    },
    is_active: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 99
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 99
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 99
    }
});


/// Hash Password Before Saving To Database
userSchema.pre('save', function(next){

    let user =this;

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if(err) return next(err);
            user.password =hashedPassword;
            next();
        });

    });
    

});


/// Generate Token
userSchema.methods.generateToken =function(cb){

    let user =this;

    let token =jwt.sign({ data: user._id }, SECRET);



}

/// find user by token
userSchema.methods.findUserByToken =function(token, cb){

    let user =this;

    let decode =jwt.verify(token, SECRET);

    

}


const User =mongoose.model('users', userSchema);

module.exports =User;