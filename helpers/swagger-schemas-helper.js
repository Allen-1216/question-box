//待修改
const schemas = {
    Role: {
      // 定義資料型態
      type: 'object',
      // 定義必要屬性
      required: ['id', 'name', 'createdAt', 'updatedAt'],
      // 定義所有屬性
      properties: {
        id: {
          type: 'string',
          description: '角色權限的 ID',
        },
        name: {
          type: 'string',
          description: '角色權限的名稱',
        },
        createdAt: {
          type: 'string',
          description: '該筆資料建立的日期，由資料庫自動生成',
        },
        updatedAt: {
          type: 'string',
          description: '該筆資料最近更新的日期，由資料庫自動生成',
        },
      },
    },
  }
  
  module.exports = schemas