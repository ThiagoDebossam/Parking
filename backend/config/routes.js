module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
    .post(app.api.user.save)
    
    app.route('/cars')
        .all(app.config.passport.authenticate())
        .post(app.api.car.save)
        
    app.route('/cars/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.car.getById)
        .delete(app.api.car.remove)
    app.route('/cars/carsDeleted/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.car.getRemoved)
}