const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const auth = require('../../middleware/auth');

const User = require('../../models/User');


// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'Такой пользователь не существует' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ message: 'Неправильный пароль' });

                    jwt.sign(
                        {id: user.id},
                        process.env.JWT_SECRET,
                        {expiresIn: 36000},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    _id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    categories: user.categories
                                }
                            })
                        }
                    );
                })
        })
});

// @route GET api/auth/user
// @desc Get User
// @access Public
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;