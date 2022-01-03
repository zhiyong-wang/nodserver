const zimimysql = require('../zmmysql')

async function tianzi_list(ctx, next) {
  let source = ctx.request.query.source;
  let page=Number(ctx.request.query.page);
  let peritem=Number(ctx.request.query.peritem);
    console.log( "AAAAAAAAAAAAAAAAAAAAaa"+source);
  let table

  switch(source){
   case 'tianzi_model':table="model";break;
   case 'tianzi_tmp':table="zimi_tmp";break;
   case 'tianzi_http':table="zimi";break;
  }
   let tianzi_count=await zimimysql(table)
       .countDistinct('zimi_id as count')
  let tianzi_list = await zimimysql(table)
    .distinct('zimi_id')
    .offset((page-1)*peritem)
	.limit(peritem)
    .orderBy('zimi_id', 'desc');
 
  ctx.state.data = {'tianzi_count':tianzi_count[0].count,'tianzi_list':tianzi_list}
  //console.log(ctx.state.data);
   
}
module.exports = tianzi_list