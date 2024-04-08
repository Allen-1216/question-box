const express = require('express')
const apiErrorHandler = require('./error/api-error-handler')
const ApiError = require('./error/ApiError');
const app = express()
const session = require('express-session')
//const port = process.env.PORT || 80;
const port = 3000;
const MySQLStore = require('express-mysql-session')(session)
const bcrypt = require('bcrypt') // hashing library
const swaggerDocs = require('./swagger/swagger.js')
const saltRounds = 10;
const mysql = require('mysql2');


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
//swagger 生成API文件
swaggerDocs(app)

//連接資料庫
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect(function (err) {
    if (err) {
        console.error('connecting error');
        return;
    }
    console.log('mysql connecting success');
});

// 設定session
const option = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
app.use(session({
    key: 'session',                     // 存到使用者瀏覽器Cookie的名稱
    secret: 'session_cookie_secret',    // session 加密的金鑰
    cookie: {maxAge: 24 * 60 * 60 * 1000},              // 設定該session的有效時間 單位ms
    store: new MySQLStore(option),          // 儲存session的方式 (MySql)
    resave: false,                      // 即使session沒做變動，是否強制重新儲存進 Store
    saveUninitialized: false,           // 沒有初始化的資料是否儲存到Storage中（新產生的 Session）
}));

const path = require('path');
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// 讀取指定會員資料
/**
 * @swagger
 * /user:
 *  get:
 *    summary: 'Retrieve user data based on the current session'
 *    description: Returns user information associated with the current session
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/GetUser'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.get('/user', (req, res, next) => {
    try {
        if(req.session.loggedin !== true) {
            // res.status(401).json({
            //     state: "failed",
            //     message: "請先登入",
            //     error: 'No data found for the session'
            // })
            // return;
            throw ApiError.Unauthorized('請先登入');
        }
        const userId = req.session.userId
        connection.query('select `account`, `name`, `email`, `introduction`, `avatar` from question_box_member_data where `uid` = ? ',
            [userId], function (err, data) {
                if (err) {
                    next(err)
                }else {
                    if (data.length > 0) {
                        if(data[0].avatar){data[0].avatar = Buffer.from(data[0].avatar, 'base64').toString();} //將buffer物件轉換為base64讓前端顯示圖片
                        res.status(200).json({
                            state: 'success',
                            msg: '請求成功，返回用戶數據',
                            data: data[0]
                        });
                    } else {
                        // res.status(400).json({
                        //     state: 'failed',
                        //     msg: '未找到用戶數據',
                        //     error: 'No data found for the user'
                        // });
                        throw ApiError.BadRequest('未找到用戶數據');
                    }
                }
            })
    } catch (err){next(err)}
})

// 更改會員資料
/**
 * @swagger
 * /user:
 *  patch:
 *    summary: 'Update user data for the current session'
 *    description: Update user data
 *    requestBody:
 *      $ref: '#/components/requestBodies/UpdateUserData'
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:       
 *              $ref: '#/components/responses/200/PatchUser'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.patch('/user', (req, res, next) => {
    const userId = req.session.userId;
    const name = req.body.name;
    const email = req.body.email;
    const introduction = req.body.introduction;
    const avatar = req.body.avatar;
    //eslint-disable-next-line
    const emailRegex = /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*/;
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    if(email && !emailRegex.test(email)) {
        throw ApiError.BadRequest('請輸入有效的電子信箱');
    }
    connection.query('select * from question_box_member_data where `uid` = ? ',
        [userId], function (err) {
            if (err) {
                next(err)
            }
            else{
                connection.query('update question_box_member_data set `name` = coalesce(?, `name`), `email` = coalesce(?, `email`), `introduction` = coalesce(?, `introduction`),`avatar` = coalesce(?, `avatar`) where `uid` = ?',
                    [name, email, introduction, avatar, userId], (err) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json({
                            state: "success",
                            message: "更改成功"
                        })
                    }
                })
            }
            // try{
            //     connection.query('update question_box_member_data set `name` = coalesce(?, `name`), `email` = coalesce(?, `email`), `introduction` = coalesce(?, `introduction`),`avatar` = coalesce(?, `avatar`) where `uid` = ?',
            //         [name, email, introduction, avatar, userId], (err) => {
            //         if (err) {
            //             next(err)
            //         } else {
            //             res.status(200).json({
            //                 state: "success",
            //                 message: "更改成功"
            //             })
            //         }
            //     })
            // }catch(err){next(err)}
    })
})

// 讀取登入狀態
/**
 * @swagger
 * /user/loginStatus:
 *  get:
 *    summary: 'Retrieve user login status for the current session'
 *    description: Returns the login status of the user
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/LoginStatus'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.get('/user/loginStatus', (req, res) => {
    if(req.session.loggedin === true) {
        res.status(200).json({
            state: "success",
            message: "登入中"
        })
    }
    else{
        //.status(401) bug 待修正
        res.json({
            state: "failed",
            message: "不是登入中"
        })
    }
})
        
// 讀取"查看信箱"頁面的訊息
/**
 * @swagger
 * /user/letterbox:
 *  get:
 *    summary: 'Retrieve user letterbox data for the current session'
 *    description: Returns the data of the user's letterbox
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/LetterBox'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.get('/user/letterbox', (req, res, next) => {
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const account = req.session.account
    connection.query('select * from question_box_message_data where `account` = ?',
        [account], function (err, data) {
        if (err) {
            next(err)
        }else{
            res.status(200).json({
                state: 'success',
                message: '請求成功，返回用戶數據',
                data: data
            });
        }
    })
})

// 送出"留言板"訊息
/**
 * @swagger
 * /user/letterbox:
 *  post:
 *    summary: 'Submit a new message to the user letterbox'
 *    description: Allows users to submit messages to the letterbox feature for communication
 *    requestBody:
 *      $ref: '#/components/requestBodies/PostLetterbox'
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:       
 *              $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.post('/user/letterbox', (req, res, next) =>{
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const account = req.body.account;
    const datetime = new Date();
    const sender_account = req.session.account;
    const sender_name = req.body.sender_name;
    const content = req.body.content;
    if(account === sender_account) {
        throw ApiError.BadRequest('請勿傳訊息給自己');
    }
    //console.log("新增訊息的詳細資料:", sender_account, "傳送給", account, content);
    connection.query('insert into question_box_message_data (`account`, `content_time`, `sender_account`,`sender_name`, `content`) values (?,?,?,?,?)',
        [account, datetime, sender_account, sender_name, content], function (err){
        if(err){
            next(err);
        }
        else{
            res.status(200).json({
                state: "success",
                message: "傳送成功"
            })
        }
    })
})

// 刪除'查看信箱'的訊息
/**
 * @swagger
 * /user/letterbox:
 *  delete:
 *    summary: 'Delete a message from the letterbox'
 *    description: Delete a specific message from the user's letterbox based on message ID
 *    requestBody:
 *      $ref: '#/components/requestBodies/PostLetterbox'
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:       
 *              $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.delete('/user/letterbox', (req, res, next) =>{
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const mid = req.body.mid;
    connection.query('delete from question_box_message_data where `mid` = ?',[mid], function (err){
        if(err){
            next(err);
        }
        else{
            res.status(200).json({
                state: "success",
                message: "刪除成功"
            })
        }
    })
})

// 讀取"收藏的問題"的訊息
/**
 * @swagger
 * /user/bookmark:
 *  get:
 *    summary: 'Retrieve bookmarked messages for the current user session'
 *    description: Returns the data of messages bookmarked by the user
 *    responses:
 *      200:
 *        description: "state: '請求成功(success)或失敗(failed)', message: '提示訊息'"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/BookMark'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
app.get('/user/bookmark', (req, res, next) => {
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const account = req.session.account
    connection.query('select mc.`cid`, ma.`mid`, ma.account, ma.content_time, ma.sender_account, ma.sender_name, ma.content\n' +
        'from question_box_message_data as ma inner join question_box_message_collections as mc\n' +
        'ON ma.`mid` = mc.article_id\n' +
        'where account = ?',
        [account], function (err, data) {
            if (err) {
                next(err)
            }else{
                res.status(200).json({
                    state: 'success',
                    msg: '請求成功，返回用戶數據',
                    data: data
                });
            }
        })
})

// 收藏"查看信箱"訊息
app.post('/user/bookmark', (req, res, next) =>{
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const account = req.body.account;
    const article_id = req.body.article_id;
    const datetime = new Date();
    if(!article_id){
        throw ApiError.BadRequest('文章已被刪除');
    }
    connection.query('select * from question_box_message_collections where `user_account` = ? and `article_id` = ?',
        [account, article_id], function (err, results) {
        if (err) {
            next(err)
        }
        else if(results.length){
            throw ApiError.BadRequest('已儲存過此內容');
        }
        else if(!results.length){
            connection.query('insert into question_box_message_collections (`user_account`, `article_id`, `created_at`) values (?,?,?)',
                [account, article_id, datetime], function (err){
                    if(err){
                        next(err);
                    }
                    else{
                        res.status(200).json({
                            state: "success",
                            message: "儲存成功"
                        })
                    }
                })
        }
    })
})

// 刪除"收藏的問題"的訊息
app.delete('/user/bookmark', (req, res, next) => {
    if(req.session.loggedin !== true) {
        throw ApiError.Unauthorized('請先登入');
    }
    const cid = req.body.cid;
    connection.query('delete from question_box_message_collections where `cid` = ?',[cid], function (err){
        if(err){
            next(err);
        }
        else{
            res.status(200).json({
                state: "success",
                message: "刪除成功"
            })
        }
    })
})

// 讀取"留言板"會員資料
app.get('/user/:id', (req, res, next) => {
    const user_account = req.params.id;
    connection.query('select `account`, `name`, `email`, `introduction`, `avatar` from question_box_member_data where `account` = ? ',
        [user_account], function (err, data) {
            try{
                if (data.length > 0) {
                    if(data[0].avatar){data[0].avatar = Buffer.from(data[0].avatar, 'base64').toString();} //將buffer物件轉換為base64讓前端顯示圖片
                    res.status(200).json({
                        state: 'success',
                        msg: '請求成功，返回用戶數據',
                        data: data[0]
                    });
                } else {
                    throw ApiError.BadRequest('未找到用戶數據');
                }
            }catch(err){next(err)}
        })
})

// 註冊會員
app.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const usernameRegex = /^[a-zA-Z0-9_.@]{4,}$/; //不含特殊字元除了_.@且長度大於4
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/; //至少含1數字英文大小寫且長度介於8-30
    // 內容不可為空
    if (!username || !password || !confirmPassword) {
        throw ApiError.BadRequest('欄位不可為空');
    }
    // 密碼不一致
    else if(password !== confirmPassword) {
        throw ApiError.BadRequest('密碼不一致');
    }
    // 帳號檢查
    else if(!usernameRegex.test(username)){
        throw ApiError.BadRequest('帳號需不含特殊字元除了_且長度大於4');
    }
    // 密碼檢查
    else if(!passwordRegex.test(password)) {
        throw ApiError.BadRequest('密碼需至少含1數字英文大小寫且長度介於8-30');
    }
    else if(username && password){
        //是否被註冊過
        connection.query('select * from question_box_member_data where account = ?', [username], function (err, results){
            if (err){
                next(err)
            }
            else{
                if(results.length > 0){
                    throw ApiError.BadRequest('註冊失敗，該帳號已被註冊');
                }else{
                    let datetime = new Date()
                    bcrypt.hash(password, saltRounds, function(error, hash) {
                        if (error){
                            next(error)
                        }
                        connection.query('insert into question_box_member_data (`account`, `password`,`signup_time`) values (?,?,?)', [username, hash, datetime], function (err) {
                            if (err){
                                next(err)
                            }
                            res.status(200).json({
                                state: "success",
                                message: "註冊成功"
                            })
                        })
                    });

                }
            }
        })
    }
})

// 登入會員
app.post('/login', function (req, res, next) {
    // Capture the input fields
    const username = req.body.username;
    const password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('select * from question_box_member_data where `account` = ?', [username], function (err, results) {
            // If there is an issue with the query, output the error
            if (err){
                next(err)
            }
            // If the account exists
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, function(err, result) {
                    if (err){
                        next(err)
                    }
                    if(result){
                        req.session.loggedin = true;        // 設定使用者狀態為登入
                        req.session.userId = results[0].uid;  // 設定該session的登入對象為該使用者
                        req.session.account = results[0].account;  // 設定該session的登入對象為該使用者
                        res.status(200).json({
                            state:"success",
                            message:"登入成功"
                        })
                        console.log("id:", req.session.userId, "account:", req.session.account, "登入成功")
                    }
                    else{
                        throw ApiError.BadRequest('登入失敗，帳號或密碼錯誤!!');
                    }
                })
            } else {
                throw ApiError.BadRequest('登入失敗，帳號或密碼錯誤!!');
            }
        })
    } else {
        // const feedbackMsg = `Please Enter ${!username ? "username" : ""} ${(!username && !password) ? "&" : ""} ${!password ? "password" : ""}`
        // res.status(400).json({
        //     state:"failed",
        //     message:feedbackMsg
        // })
        // 內容不可為空
        if (!username || !password) {
            throw ApiError.BadRequest('欄位不可為空');
        }
    }
});

// 登出
app.post('/logout', function (req, res, next) {
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    const LogoutAccount = req.session.account
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            try {
                res.status(200).json({
                    state:"success",
                    message:"登出成功"
                })
                console.log("id:", req.session.userId, "account:", LogoutAccount, "登出成功");
            }catch (err){
                throw ApiError.BadRequest('登入失敗，帳號或密碼錯誤!!');
            }
        })
    })
})

// API 404判斷
// eslint-disable-next-line
app.use((req, res, next) => {
    throw ApiError.NotFound();
});

app.use(apiErrorHandler)

// Handle all routes by serving the 'index.html' file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//connection.end() // 關閉與資料庫的連線