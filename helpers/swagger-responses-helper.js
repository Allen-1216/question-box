const responses = {
    // 400 狀態碼的響應
    400: {
      description: 'Bad Request - 請求中的值無效或格式錯誤',
      contenets: 'application/json',
    },
    // 401 狀態碼的響應
    401: {
      description: 'Unauthorized - session 的值無效或格式錯誤',
      contenets: 'application/json',
    },
    // 200 狀態碼的響應
    200: {
      // 200 狀態碼又根據不同情況劃分為 User, GeneralRes, Pagination 等等
      // description: Successful operation
      GetUser: {
        type: 'object',
        properties: {
          account: {
            type: 'string',
            description: '使用者的帳號',
          },
          name: {
            type: 'string',
            description: '使用者的名稱',
          },
          email: {
            type: 'string',
            description: '使用者的信箱',
          },
          introduction: {
            type: 'string',
            description: '使用者的自我介紹',
          },
          link: {
            type: 'string',
            description: '使用者的訊息頁面連結',
          },
          avatar: {
            type: 'string',
            description: '使用者的大頭照',
          },
        },
      },
      GeneralRes: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: '請求狀態',
          },
          message: {
            type: 'string',
            description: '提示訊息',
          },
        },
      },
      PatchUser: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '使用者的名稱',
          },
          email: {
            type: 'string',
            description: '使用者的信箱',
          },
          introduction: {
            type: 'string',
            description: '使用者的自我介紹',
          },
          avatar: {
            type: 'string',
            description: '使用者的大頭照',
          },
        },
      },
      LoginStatus: {
        type: 'object',
        properties: {
          state: {
            type: 'string',
            description: '登入狀態',
          },
          message: {
            type: 'string',
            description: '提示訊息',
          },
        }
      },
      LetterBox: {
        type: 'object',
        properties: {
          mid: {
            type: 'string',
            description: '文章編號',
          },
          account: {
            type: 'string',
            description: '使用者的帳號',
          },
          content_time: {
            type: 'string',
            description: '訊息建立時間',
          },
          sender_account: {
            type: 'string',
            description: '發送訊息的使用者帳號',
          },
          sender_name: {
            type: 'string',
            description: '發送訊息的使用者名稱',
          },
          content: {
            type: 'string',
            description: '訊息內容',
          },
        }
      },
      
      // Pagination: {
      //   type: 'object',
      //   properties: {
      //     pageInfo: {
      //       type: 'object',
      //       description: '分頁訊息',
      //       example: {
      //         dataCount: '資料總量',
      //         pageCount: '頁碼總數',
      //         pageNumArr: '頁碼陣列',
      //         currentPage: '當前分頁的頁碼',
      //         prev: '當前分頁的上一頁的頁碼',
      //         next: '當前分頁的下一頁的頁碼',
      //       },
      //     },
      //     data: {
      //       type: 'array',
      //       description: '當前頁碼的所有資料',
      //       example: [
      //         {
      //           description:
      //             '當前頁碼下的所有資料，資料內容如：id, createdAt 等等',
      //         },
      //       ],
      //     },
      //   },
      // },
    },
  }
  
  module.exports = responses