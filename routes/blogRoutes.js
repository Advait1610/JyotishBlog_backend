const express = require('express');
const { getAllBlogsController,createBlogController,updateBlogController,getBlogByIdController,deleteBlogByIdController, userBlogController} = require('../controllers/blogController');
//router
const router = express.Router();

//routes

// GET || all blogs
router.get('/all-blogs', getAllBlogsController);

//POST || create blog
router.post('/create-blog', createBlogController);

//PUT || update blog
router.put('/update-blog/:id',updateBlogController);

//GET || Single Blog Detail
router.get('/get-blog/:id', getBlogByIdController );

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogByIdController);

router.get('/get-user-blogs/:id', userBlogController)


module.exports=router;