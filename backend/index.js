// Module dependecies
require('dotenv').config()
var express = require("express");
var hash = require("pbkdf2-password")();
var cors = require("cors")
var session = require("express-session");
const apiUrl = process.env.API_URL

var app = (module.exports = express());

require('./router')(app)

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "shhh",
    })
);

app.use((req, res, next) => {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = "";
    if (err) res.locals.message = err;
    if (msg) res.locals.message = msg;
    next();
});

var users = {
    tj: { name: "tj" },
};

hash({ password: "foobar" }, (err, pass, salt, hash) => {
    if (err) throw err;
    users.tj.salt = salt
    users.tj.hash = hash;
});

function authenticate(name, pass, fn) {
    if (!module.parent) console.log("authenticating %s:%s", name, pass);
    var user = users[name];
    if (!user) return fn('User dont exists', null);
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user);
        fn(null, null);
    });
}


app.post("/login", function (req, res, next) {

    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return res.status(404).send({
            status: "fail",
            jsonapi: '/login',
            self: `${apiUrl}/login`,
            error: 
                {
                    status: 404,
                    title: "Invalid Attribut",
                    description: err
                }
            
        })
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = `Authenticated as ${user.name}`
                res.status(202).send({
                    status: "success",
                    jsonapi: '/login',
                    self: `${apiUrl}/login`,
                    data: {
                        user: req.session.user.name,
                        message: req.session.success
                    }
                })
            });
        } else {
            req.session.error =
                "Authentication failed, please check your password."
            res.status(401).send({
                status: "fail",
                jsonapi: '/login',
                self: `${apiUrl}/login`,
                error: 
                    {
                        status: 401,
                        title: "Invalid Attribut",
                        description: req.session.error
                    }
                
            })
        }
    });
});

if (!module.parent) {
    app.listen(3000);
    console.log("Express started on port 3000");
}
