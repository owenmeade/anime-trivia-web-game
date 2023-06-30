const router = require('express').Router();
const {Scores, User} = require('../models');
const withAuth = require('../utils/helpers/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/trivia', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Scores}],
        });
        const user = userData.get({plain: true});

        res.render('trivia', {
            ...user,
            logged_in: true
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/trivia');
      return;
    }
    res.render('login');
  });
  
module.exports = router;