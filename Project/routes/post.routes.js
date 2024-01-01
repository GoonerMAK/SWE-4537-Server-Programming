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
    appendPgnsToPost,
    appendCommentToPost,
    deleteCommentFromPost,
    editCommentOfPost,
    getAllCommentsOfPost,
    appendImagesToComment,
    appendAudiosToComment,
    deleteAllImagesFromPost,
    deleteAllAudiosFromPost,
    deleteAllImagesFromComment,
    deleteAllAudiosFromComment,
    appendReplyToComment,
    deleteReplyFromComment,
    editReplyOfComment,
    getAllRepliesOfComment,
    appendImagesToReply,
    appendAudiosToReply,
    deleteAllImagesFromReply,
    deleteAllAudiosFromReply,
} = require("../controllers/post.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");
const {uploadImage, uploadAudioFile, uploadPgnFile} = require("../middlewares/media.middleware")


router.get("/post/:postID", ensureAuthenticated, getPostById);

router.get("/posts", ensureAuthenticated, getAllPosts);

router.get("/allPosts", ensureAuthenticated, getAllPostsPage);

router.get("/post", ensureAuthenticated, getCreatePostPage);

router.post("/post", ensureAuthenticated, createPost);

router.patch("/post+/:postID", ensureAuthenticated, updatePost);

router.delete("/post/:postID", ensureAuthenticated, deletePost);

router.post("/post/:postID/images", ensureAuthenticated, uploadImage.array('images', 5), appendImagesToPost);

router.post("/post/:postID/audios", ensureAuthenticated, uploadAudioFile.array('audios', 5), appendAudiosToPost);

router.post("/post/:postID/pgns", ensureAuthenticated, uploadPgnFile.single('pgn'), appendPgnsToPost);

router.delete('/post/:postID/images', ensureAuthenticated, deleteAllImagesFromPost);

router.delete('/post/:postID/audios', ensureAuthenticated, deleteAllAudiosFromPost);


router.post("/post/:postID/comment", ensureAuthenticated, appendCommentToPost);

router.delete("/post/:postID/comment/:commentID", ensureAuthenticated, deleteCommentFromPost);

router.put("/post/:postID/comment/:commentID", ensureAuthenticated, editCommentOfPost);

router.get("/post/:postID/comments", ensureAuthenticated, getAllCommentsOfPost);

router.post("/post/:postID/comment/:commentID/images", ensureAuthenticated, uploadImage.array('images', 5), appendImagesToComment);

router.post("/post/:postID/comment/:commentID/audios", ensureAuthenticated, uploadAudioFile.array('audios', 5), appendAudiosToComment);

router.delete('/post/:postID/comment/:commentID/images', ensureAuthenticated, deleteAllImagesFromComment);

router.delete('/post/:postID/comment/:commentID/audios', ensureAuthenticated, deleteAllAudiosFromComment);


router.post('/post/:postID/comment/:commentID/reply', ensureAuthenticated, appendReplyToComment);

router.delete('/post/:postID/comment/:commentID/reply/:replyID', ensureAuthenticated, deleteReplyFromComment);

router.put('/post/:postID/comment/:commentID/reply/:replyID', ensureAuthenticated, editReplyOfComment);

router.get('/post/:postID/comment/:commentID/replies', getAllRepliesOfComment);

router.post('/post/:postID/comment/:commentID/reply/:replyID/images', ensureAuthenticated, uploadImage.array('images', 5), appendImagesToReply);

router.post('/post/:postID/comment/:commentID/reply/:replyID/audios', ensureAuthenticated, uploadAudioFile.array('audios', 5), appendAudiosToReply);

router.delete('/post/:postID/comment/:commentID/reply/:replyID/images', ensureAuthenticated, deleteAllImagesFromReply);

router.delete('/post/:postID/comment/:commentID/reply/:replyID/audios', ensureAuthenticated, deleteAllAudiosFromReply);

module.exports = router;