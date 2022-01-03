const zimimysql = require('../zmmysql')

async function tianzi_delete(ctx, next) {
  let source=ctx.request.body.source
  let id=ctx.request.body.id
  //console.log(source);
   let table;
   switch(source){
   case 'tianzi_model':table="model";break;
   case 'tianzi_tmp':table="zimi_tmp";break;
   case 'tianzi_http':table="zimi";break;
  }
  await zimimysql(table)
      .where({zimi_id:id})
      .del()
  await zimimysql("model_appear")
  .where({model_id:id,model_type:table})
  .del()
}
module.exports = tianzi_delete