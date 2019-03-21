const zimimysql = require('../zmmysql')

async function tianzi_http(ctx, next){
  let maxid=await zimimysql('zimi').max('zimi_id as max')
  let id = (ctx.params.id<0?maxid[0].max:ctx.params.id)
  let zimi_h =await zimimysql('zimi')
                    .select('midi','question','answer','zb','zongheng','difficulty','clarity')
                    .where({zimi_id: id, zongheng:1})
                    .orderBy('zb');
  let zimi_z = await zimimysql('zimi')
                    .select('midi', 'question', 'answer', 'zb', 'zongheng','difficulty','clarity')
                    .where({ zimi_id:id, zongheng: 0 })
                    .orderBy('zb');                    
  ctx.state.data = [...zimi_h,...zimi_z];

}

module.exports = tianzi_http