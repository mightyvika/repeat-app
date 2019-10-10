const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').JWTSecret;

const User = require('../../models/User');

// @route GET api/users
// @desc Get All Users
// @access Public
router.get('/', (req, res) => {
    User.find()
        .sort({ created_at: -1 })
        .then(users => res.json(users))
});

// @route POST api/users
// @desc Create User
// @access Public
router.post('/', (req, res) => {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'Такой пользователь уже существует' })

            const newUser = new User({
                name,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user.id},
                                require('./config/keys').JWTSecret,
                                {expiresIn: 36000},
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            );
                        })
                })
            })
        })
});

module.exports = router;