const zimimysql = require('../zmmysql')

async function zimionserver_add(ctx, next) {
  let zimi = ctx.request.body
  console.log(ctx.request.body);

  let zimi_saved=await zimimysql('zimionserver')
      .first('id')
      .where({'zimi_id':zimi.tianzi_id})
  if(zimi_saved){
    await zimimysql('zimionserver')
        .where({'id':zimi_saved.id})
        .update({ zimi_id: zimi.tianzi_id, rate: zimi.rate, tag: zimi.tag}); 
  }
  else{
    await zimimysql('zimionserver')
        .insert({ zimi_id: zimi.tianzi_id, rate: zimi.rate, tag: zimi.tag});
  }


}   
module.exports = zimionserver_add
