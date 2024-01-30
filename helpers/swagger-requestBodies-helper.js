const requestBodies = {
  UpdateUserData: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [],
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
                description: '使用者的大頭貼',
              },
            },
          },
        },
      },
  },
  PostLetterbox: {
    required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['account','sender_name','content'],
            properties: {
              account: {
                type: 'string',
                description: '接收人的帳號',
              },
              sender_name: {
                type: 'string',
                description: '傳送人的名稱',
              },
              content: {
                type: 'string',
                description: '內容',
              },
            },
          },
        },
      },
  },
  DeleteMessage: {
    required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            // required: [],
            properties: {
              mid: {
                type: 'string',
                description: '訊息編號',
              },
            },
          },
        },
      },
  },
  // User: {
  //   required: true,
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         required: ['email', 'password'],
  //         properties: {
  //           email: {
  //             type: 'string',
  //             description: '使用者的帳號',
  //           },
  //           password: {
  //             type: 'string',
  //             description: '使用者的密碼',
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  Login: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              description: '使用者的信箱 (作為登入帳號)',
            },
            password: {
              type: 'string',
              description: '使用者的密碼 (作為登入密碼)',
            },
          },
        },
      },
    },
  },
}
  
  module.exports = requestBodies