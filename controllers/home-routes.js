const router = require('express').Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try { 
  const commentData = await Comment.findAll({
    include: [{ model: User, attributes: ["name"] }],
  });
  
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  console.log(req.session)
  res.render("home", {
    comments,
    logged_in: req.session.logged_in,
  });
}
catch(error) {
  console.log(error)
  
res.status(500).json(error);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/comment', withAuth, async (req, res) => {
  try {
    
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const user = userData.get({ plain: true });

    res.render('comment', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signin', (req, res) => {
    res.render("signin")
})

router.get('/comment', (req, res) => {
  res.render("comment")
})

router.get('/signin', (req, res) => {
    
    if (req.session.logged_in) {
      res.redirect('/comment');
      return;
    }
  
    res.render('signin');
  });

  router.get('/dashboard', (req, res) => {
    res.render('dashboard');
    
  })

module.exports = router;