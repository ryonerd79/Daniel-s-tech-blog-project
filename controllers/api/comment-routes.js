const router = require('express').Router();
const { Comment, Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/comment-route/:id', async (req, res) => {
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
    });


    const post = postData.get({ plain: true });
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

router.post('/', withAuth, async (req, res) => {
  console.log('function working')
  console.log(req.body)
  try {
    const newComment = await Comment.create({
       
      ...req.body, 
      user_id: req.session.user_id,
      
    });
    console.log(newComment)
    res.status(200).json(newComment);
   
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



module.exports = router;