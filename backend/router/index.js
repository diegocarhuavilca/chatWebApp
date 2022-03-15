
var userRoutes = require('./user')

module.exports = function(app){
    app.use('/user',userRoutes)
}