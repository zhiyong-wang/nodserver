const zimimysql = require('../zmmysql')

async function get(ctx, next) {
  let maxid=await zimimysql('model').max('zimi_id as max')
  let id = (ctx.params.id<0?maxid[0].max:ctx.params.id)

    let zimi_h = await zimimysql('model')
      .select('midi', 'question', 'answer', 'zb', 'zongheng','midi_length')
      .where({ zimi_id: id, zongheng: 1 })
      .orderBy('zb');
    let zimi_z = await zimimysql('model')
      .select('midi', 'question', 'answer', 'zb', 'zongheng', 'midi_length')
      .where({ zimi_id: id, zongheng: 0 })
      .orderBy('zb');
    let grids=await zimimysql('model_appear')
      .select('disappear_grids')
      .where({'model_id':id,'model_type':'model'})
    console.log(grids)
    let disappear_grids=grids.length>0?grids[0].disappear_grids:""
    ctx.state.data ={ 'zimi':[...zimi_h, ...zimi_z],'disappear_grids':disappear_grids};
}
async function post(ctx, next) {
  let zimis= ctx.request.body.zimi
  let id = ctx.params.id;
  for (zimi of zimis) {
      await zimimysql('zimi_tmp')
        .where({zimi_id:id,zb:zimi.zb, zongheng:zimi.zongheng,})
        .update({ midi: zimi.midi, question: zimi.question, answer: zimi.answer})
    } 
  }
module.exports = {
  post,
  get
}