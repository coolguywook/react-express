import express from 'express';
import Comment from '../models/comment';
import mongoose from 'mongoose';

const router = express.Router();

// Write
router.post('/', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    if(typeof req.body.contents !== "string") {
        return res.status(400).json({
            error: "WRONG CONTENTS",
            code: 2
        });
    }

    if(typeof req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    let comment = new Comment({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    comment.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    })
});

// Modify
router.post('/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if(typeof req.body.contents !== "string") {
        return res.status(400).json({
            error: "WRONG CONTENTS",
            code: 2
        });
    }

    if(typeof req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    Comment.findById(req.params.id, (err, comment) => {
        if(err) throw err;

        if(!comment) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        if(comment.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        comment.contents = req.body.contents;
        comment.date.edited = new Date();
        comment.isEdited = true;

        comment.save((err, comment) => {
            if(err) throw err;

            return res.json({ success: true, comment });
        })
    });
});

// Delete
router.post('/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if(typeof req.session.loginInfo == "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        })
    }

    Comment.findById(req.params.id, (err, comment) => {
        if(err) throw err;

        if(!comment) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if(comment.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FSILURE",
                code: 4
            })
        }

        Comment.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });
});

// Get
router.post('/', (req, res) => {
    Comment.find().sort({"_id": -1}).limit(6)
        .exec((err, comments) => {
            if(err) throw err;
            res.json(comments);
        });
});

export default router;
