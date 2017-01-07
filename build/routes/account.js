'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    ACCCOUNT SIGNUP : POST /api/account/signup
*/
router.post('/signup', function (req, res) {

    var usernameRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    _account2.default.fondOne({ username: req.body.username }, function (err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        var account = new _account2.default({
            username: req.body.username,
            password: req.body.password,
            roles: ['ROLE_USER']
        });

        account.password = account.generateHash(account.password);

        account.save(function (err) {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

router.post('/signin', function (req, res) {

    if (typeof req.body.password != "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    _account2.default.findOne({ username: req.body.username }, function (err, account) {
        if (err) throw err;

        if (!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        var session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username,
            roles: account.roles
        };

        res.json({ success: true });
    });
});

/*
    To check validate cookie, when refresh browser.
*/
router.get('/getinfo', function (req, res) {
    if (typeof req.session.loginInfo == "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

router.post('/signout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ success: true });
});

exports.default = router;