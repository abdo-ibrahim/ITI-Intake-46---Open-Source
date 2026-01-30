const express = require('express');
const postsController = require('../controllers/posts');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Protected routes
router.use(authenticate);

router.get('/', validate(schemas.posts.getAllPostsSchema), postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', validate(schemas.posts.createPostSchema), postsController.createPost);
router.patch('/:id', validate(schemas.posts.updatePostSchema), postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);


module.exports = router;
