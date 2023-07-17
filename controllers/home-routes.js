const router = require('express').Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try { 
  const commentData = await Comment.findAll({
    include: [{ model: User, attributes: ["username"] }],
  });
  
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  
  res.render("homepage", {
    comments,
    logged_in: req.session.logged_in,
  });
}
catch(error) {
  console.log(error)
  
res.status(500).json(error);
  }
})


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

module.exports = router;