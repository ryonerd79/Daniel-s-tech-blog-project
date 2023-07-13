const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    
    
    try {
      const postData = await Post.create(req.body);
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
   
  });
  
  router.put('/', async (req, res) => {
    
    try {
      const postData = await Post.update(
        req.body,
        { where: { id: req.params.id} }
      )
      res.status(200).json(postData);
    } catch (err) {
      handleError(err)
    }
  });
  
  router.delete('/', async (req, res) => {
    
    try {
      const tagData = await Post.destroy(
        {where: {
          id: req.params.id
        }}
      );
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;