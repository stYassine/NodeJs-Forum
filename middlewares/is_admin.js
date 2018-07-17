const isAdmin =(request, response, next) => {

    if(!request.user.is_admin) return response.redirect('/');

    next();

}

module.exports =isAdmin;