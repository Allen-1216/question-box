class ApiError{
    constructor(code, message, error, state) {
        this.code = code;
        this.message = message;
        this.error = error;
        this.state = state;
    }
    //無效的請求訊息或欺騙性路由請求
    static BadRequest(msg){
        return new ApiError(400, msg);
    }
    //未認證，即使用者沒有必要的憑據
    static Unauthorized(){
        return new ApiError(401, '請先登入', 'No data found for the session', 'failed');
    }
    //請求失敗，請求所希望得到的資源未被在伺服器上發現
    static NotFound(){
        return new ApiError(404, 'API Not Found');
    }
    //伺服器遇到了一個未曾預料的狀況，導致了它無法完成對請求的處理。
    static InternalServerError(msg){
        return new ApiError(500, msg)
    }
}

module.exports = ApiError;