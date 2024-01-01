const express = require("express");
const router = express.Router();
const {
    getCreatePostPage,
    getAllPosts,
    getPostById,
    createPost,
    updatePost, 
    deletePost,
    appendImagesToPost,
    appendAudiosToPost,
} = require("../controllers/post.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");
const {uploadImage, uploadAudioFile} = require("../middlewares/media.middleware")


router.get("/post/:postID", ensureAuthenticated, getPostById);

router.get("/posts", ensureAuthenticated, getAllPosts);

router.get("/post", ensureAuthenticated, getCreatePostPage);

router.post("/post", ensureAuthenticated, createPost);

router.patch("/post+/:postID", ensureAuthenticated, updatePost);

router.delete("/post/:postID", ensureAuthenticated, deletePost);

router.post("/post/:postID/images", ensureAuthenticated, uploadImage.array('images', 5), appendImagesToPost);

router.post("/post/:postID/audios", ensureAuthenticated, uploadAudioFile.array('audios', 5), appendAudiosToPost);

module.exports = router;