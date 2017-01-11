'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _comment = require('../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Write
router.post('/', function (req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    if (typeof req.body.contents !== "string") {
        return res.status(400).json({
            error: "WRONG CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    var comment = new _comment2.default({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    comment.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

// Modify
router.post('/:id', function (req, res) {
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if (typeof req.body.contents !== "string") {
        return res.status(400).json({
            error: "WRONG CONTENTS",
            code: 2
        });
    }

    if (req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    _comment2.default.findById(req.params.id, function (err, comment) {
        if (err) throw err;

        if (!comment) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        if (comment.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        comment.contents = req.body.contents;
        comment.date.edited = new Date();
        comment.isEdited = true;

        comment.save(function (err, comment) {
            if (err) throw err;

            return res.json({ success: true, comment: comment });
        });
    });
});

// Delete
router.post('/:id', function (req, res) {
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if (typeof req.session.loginInfo == "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    _comment2.default.findById(req.params.id, function (err, comment) {
        if (err) throw err;

        if (!comment) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if (comment.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FSILURE",
                code: 4
            });
        }

        _comment2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

// Get
router.post('/', function (req, res) {
    _comment2.default.find().sort({ "_id": -1 }).limit(6).exec(function (err, comments) {
        if (err) throw err;
        res.json(comments);
    });
});

exports.default = router;