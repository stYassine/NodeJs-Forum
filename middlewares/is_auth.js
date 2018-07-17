const isAuth =(request, response, next) => {

    if(!request.user) return response.redirect('/login');

    next();

}

module.exports =isAuth;