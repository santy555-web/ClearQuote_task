var User = require('./models/user');
var Employee = require('./models/employee');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
    app.get('/emp', auth, function (req, res) {
        console.log('get-data called');
        Employee.find({}, function (err, todos) {
            if (!err) {
                res.json({ status: true, todos });
            } else {
                res.json({ status: false, err });
            }
        })

    });

    app.post('/emp', auth, function (req, res) {
        console.log('POST....');
        var emp = req.body;
        console.log(emp);
        Employee.create(emp, function (err, response) {
            if (!err) {
                res.json({ status: true, response });
            } else {
                res.json({ status: false, err });
            }
        });
    });

    app.put('/emp/:id', auth, function (req, res) {
        console.log('PUT....');
        var id = req.body.id;
        var name = req.body.name;
        var gmail = req.body.gmail;
        var empaddress = req.body.empaddress;
        var id = req.params.id;
        Employee.findById(id, function (err, emp) {
            emp.id = id;
            emp.name = name;
            emp.empaddress = empaddress;
            emp.save(function (err, response) {
                if (!err) {
                    res.json({ status: true, response });
                } else {
                    res.json({ status: false, err });
                }
            });
        })
    });

    app.delete('/emp/:id', auth, function (req, res) {
        console.log('DELETE...');

        var id = req.params.id;
        Employee.findByIdAndRemove(id, function (err, response) {
            if (!err) {
                res.json({ status: true, response });
            } else {
                res.json({ status: false, err });
            }
        });
    });

    app.post('/register', function (req, res) {
        console.log(req.body);
        createHash(req.body.password, function (hash) {
            var user = new User({
                name: req.body.name,
                gender: req.body.gender,
                mobile_no:req.body.mobile_no,
                email: req.body.email,
                password: hash
            });

            user.save(function (err, result) {
                if (!err) {
                    res.json({ status: true, result });
                } else {
                    res.json({ status: false, err });
                }
            });
        });
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({ email: email }, function (err, user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, hashRes) {
                    if (hashRes) {
                        res.json({ status: true, message: 'Login success', token: getToken({ email: user.email }) });
                    } else {
                        res.json({ status: false, message: 'Password does not match' });
                    }
                });
            } else {
                res.json({ status: false, message: 'User does not exist' });
            }
        });
    });

    function createHash(password, callback) {
        bcrypt.hash(password, 10, function (err, hash) {
            callback(hash);
        });
    }

    function getToken(user) {
        return jwt.sign(user, 'ertert', { expiresIn: '1h' });
    }

    function auth(req, res, next) {
        var token = req.headers.authorization;
        if (token) {
            jwt.verify(token, 'ertert', function (err, decoded) {
                if (err) {
                    res.json({ status: false, err: 'Token is not valid' });
                } else {
                    next();
                }
            });
        } else {
            res.json({ status: false, err: 'No token found' });
        }

    }
};