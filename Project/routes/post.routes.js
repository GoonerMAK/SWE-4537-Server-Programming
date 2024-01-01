const express = require("express");
const router = express.Router();
const {
    getCreatePostPage,
    getAllPosts,
    getAllPostsPage,
    getPostById,
    createPost,
    updatePost, 
    deletePost,
    appendImagesToPost,
    appendAudiosToPost,
    appendCommentToPost,
    deleteCommentFromPost,
    editCommentOfPost,
    getAllCommentsOfPost,
} = require("../controllers/post.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");
const {uploadImage, uploadAudioFile} = require("../middlewares/media.middleware")


router.get("/post/:postID", ensureAuthenticated, getPostById);

router.get("/posts", ensureAuthenticated, getAllPosts);

router.get("/allPosts", ensureAuthenticated, getAllPostsPage);

router.get("/post", ensureAuthenticated, getCreatePostPage);

router.post("/post", ensureAuthenticated, createPost);

router.patch("/post+/:postID", ensureAuthenticated, updatePost);

router.delete("/post/:postID", ensureAuthenticated, deletePost);

router.post("/post/:postID/images", ensureAuthenticated, uploadImage.array('images', 5), appendImagesToPost);

router.post("/post/:postID/audios", ensureAuthenticated, uploadAudioFile.array('audios', 5), appendAudiosToPost);

router.post("/post/:postID/comment", ensureAuthenticated, appendCommentToPost);

router.delete("/post/:postID/comment/:commentID", ensureAuthenticated, deleteCommentFromPost);

router.put("/post/:postID/comment/:commentID", ensureAuthenticated, editCommentOfPost);

router.get("/post/:postID/comments", ensureAuthenticated, getAllCommentsOfPost);

module.exports = router;