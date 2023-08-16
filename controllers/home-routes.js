const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

//router.get('/', async)

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id', 'title', 'content', 'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id', 'body', 'created_at'
          ],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
    

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts[0])
    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
    });
  }
  catch (error) {
    console.log(error)

    res.status(500).json(error);
  }
})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
        'id', 'title', 'content', 'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id', 'body', 'created_at'
          ],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
    

    const post = postData.get({plain: true });
    console.log(post)
    res.render("post_detail", {
      post,
      logged_in: req.session.logged_in,
    });
  }
  catch (error) {
    console.log(error)

    res.status(500).json(error);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
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

// router.get('/signin', (req, res) => {

//     if (req.session.logged_in) {
//       res.redirect('/comment');
//       return;
//     }

//     res.render('signin');
//   });

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  })

})

module.exports = router;