const router = require('express').Router();
const userRoutes = require('./User');
const postRoutes = require('./Post');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;