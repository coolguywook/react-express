import express from 'express';
import account from './account';
import comment from './comment';

const router = express.Router();
router.use('/account', account);
router.use('/comment', comment);

export default router;
