class ApiError{
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    //無效的請求訊息或欺騙性路由請求
    static BadRequest(msg){
        return new ApiError(400, msg);
    }
    //未認證，即使用者沒有必要的憑據
    static Unauthorized(msg){
        return new ApiError(401, msg);
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