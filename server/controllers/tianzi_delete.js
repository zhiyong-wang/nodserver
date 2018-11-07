const zimimysql = require('../zmmysql')

async function tianzi_delete(ctx, next) {
  let source=ctx.request.body.source
  let id=ctx.request.body.id
  console.log(source);
  let table = (source == "tmp" ? 'zimi_tmp' : 'zimi')
  await zimimysql(table)
      .where({zimi_id:id})
      .del()
}
module.exports = tianzi_delete