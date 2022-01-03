const zimimysql = require('../zmmysql')

async function appearModel_delete(ctx, next) {
    let id=ctx.request.body.id
  await zimimysql('appear')
      .where({id:id})
      .del()
 
}
module.exports = appearModel_delete