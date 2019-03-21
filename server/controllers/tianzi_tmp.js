const zimimysql = require('../zmmysql')

async function get(ctx, next) {
  let maxid=await zimimysql('zimi_tmp').max('zimi_id as max')
  let id = (ctx.params.id<0?maxid[0].max:ctx.params.id)
    let zimi_h = await zimimysql('zimi_tmp')
      .select('midi', 'question', 'answer', 'zb', 'zongheng','midi_length','difficulty','clarity')
      .where({ zimi_id: id, zongheng: 1 })
      .orderBy('zb');
    let zimi_z = await zimimysql('zimi_tmp')
      .select('midi', 'question', 'answer', 'zb', 'zongheng', 'midi_length','difficulty','clarity')
      .where({ zimi_id: id, zongheng: 0 })
      .orderBy('zb');
    ctx.state.data = [...zimi_h, ...zimi_z];
}
async function post(ctx, next) {
  let zimis= ctx.request.body.zimi
  let id = ctx.params.id;
  for (zimi of zimis) {
      await zimimysql('zimi_tmp')
        .where({zimi_id:id,zb:zimi.zb,zongheng:zimi.zongheng})
        .update({ midi: zimi.midi, question: zimi.question, answer: zimi.answer,difficulty:zimi.difficulty,clarity:zimi.clarity})
    } 
  }
module.exports = {
  post,
  get
}