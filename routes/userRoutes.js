const express = require('express');
//const userController = require('../controllers/userController');

const router = express.Router();

router.get('/user',  ) // 讀取指定會員資料
router.patch('/user',  ) // 更改會員資料
router.get('/user/loginStatus', ) // 讀取登入狀態
router.get('/user/letterbox',  ) // 讀取"查看信箱"頁面的訊息
router.post('/user/letterbox', ) // 送出"留言板"訊息
router.delete('/user/letterbox', ) // 刪除'查看信箱'的訊息
router.get('/user/bookmark',  ) // 讀取"收藏的問題"的訊息
router.post('/user/bookmark', ) // 收藏"查看信箱"訊息
router.delete('/user/bookmark', ) // 刪除"收藏的問題"的訊息
router.get('/user/:id', ) // 讀取"留言板"會員資料
router.post('/signup', ) // 註冊會員
router.post('/login', ) // 登入會員
router.post('/logout', ) // 登出


module.export = router;