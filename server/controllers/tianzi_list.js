const zimimysql = require('../zmmysql')

async function tianzi_list(ctx, next) {
  let source = ctx.params.source;
  let table=(source=="tmp"?'zimi_tmp':'zimi')
  let tianzi_list = await zimimysql(table)
    .distinct('zimi_id')
    .orderBy('zimi_id');
 
  ctx.state.data = tianzi_list
  console.log(ctx.state.data);
}
module.exports = tianzi_list