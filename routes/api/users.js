

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'Такой пользователь уже существует' })

            const newUser = new User({
                name,
                email,
                password,
                created_at: new Date(),
                updated_at: new Date()
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user.id},
                                process.env.JWT_SECRET,
                                {expiresIn: 36000},
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            categories: user.categories
                                        }
                                    })
                                }
                            );
                        })
                })
            })
        })
});

// @route POST api/users
// @desc Add Word Category To User
// @access Public
router.post('/word_category', (req, res) => {

    const { userId, categoryId } = req.body;

    if (!userId || !categoryId) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }
    console.log(userId, categoryId)
    User.findByIdAndUpdate(userId,
        { "$push": { "categories": categoryId } },
        { "new": true, "upsert": true })
            .then(res => {
                console.log(res)
        })
});

// @route POST api/users
// @desc Add Word Category To User
// @access Public
router.post('/word_category/add', (req, res) => {

    const { userId, categoryId } = req.body;

    if (!userId || !categoryId) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }
    console.log(userId, categoryId)
    User.findByIdAndUpdate(userId,
        { "$push": { "categories": categoryId } },
        { "new": true, "upsert": true })
        .then(result => {
            res.json({categories: result.categories})
        })
});

// @route POST api/users
// @desc Add Word Category To User
// @access Public
router.post('/word_category/remove', (req, res) => {

    const { userId, categoryId } = req.body;

    if (!userId || !categoryId) {
        return res.status(400).json({ message: 'Заполните все поля' });
    }
    User.findByIdAndUpdate(userId,
        { "$pull": { "categories": categoryId } }, {new: true})
        .then((result) => {
            res.json({categories: result.categories})
        })
});

// @route POST api/users
// @desc Add Word Category To User
// @access Public
router.post('/words', (req, res) => {

    const { userId, wordId, type } = req.body;

    if (!userId || !wordId || !type) {
        return res.status(400).json({ message: 'Field is missing' });
    }
    console.log(userId, wordId)
    switch (type) {
        case 'learning':
            User.findByIdAndUpdate(userId,
                { "$push": { "wordsToLearn": wordId } },
                { "new": true, "upsert": true })
                .then(result => {
                    res.json({words: result.wordsToLearn})
                });
            break;
        case 'learned':
            User.findByIdAndUpdate(userId,
                { "$push": { "learnedWords": wordId } },
                { "new": true, "upsert": true })
                .then(result => {
                    res.json({words: result.learnedWords})
                });
            break;
        case 'known':
            User.findByIdAndUpdate(userId,
                { "$push": { "knownWords": wordId } },
                { "new": true})
                .then(result => {
                    console.log(result)
                    res.json({words: result.knownWords})
                });
            break;
    }

});

module.exports = router;