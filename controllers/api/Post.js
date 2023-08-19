const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth')
router.post('/', withAuth, async (req, res) => {

  console.log(req.body)
  try {
    const postData = await Post.create({ ...req.body, user_id: req.session.user_id });
    console.log(postData);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }

});

router.put('/:id', async (req, res) => {

  try {
    const postData = await Post.update(
      req.body,
      { where: { id: req.params.id } }
    )
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const tagData = await Post.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;