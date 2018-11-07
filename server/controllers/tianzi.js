const zimimysql = require('../zmmysql')

async function tianzi(ctx, next){
  let id = (ctx.params.id?ctx.params.id:1)
  console.log(id);
  let zimi_h =await zimimysql('zimi')
                    .select('midi','question','answer','zb','zongheng')
                    .where({zimi_id: id, zongheng:1})
                    .orderBy('zb');
  let zimi_z = await zimimysql('zimi')
                    .select('midi', 'question', 'answer', 'zb', 'zongheng')
                    .where({ zimi_id:id, zongheng: 0 })
                    .orderBy('zb');                    
  ctx.state.data = [...zimi_h,...zimi_z];
  console.log(ctx.state.data);
}

module.exports = tianzi