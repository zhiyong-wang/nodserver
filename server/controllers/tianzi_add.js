const zimimysql = require('../zmmysql')

async function tianzi_add(ctx, next) {
  let source = ctx.request.body.source
  let zimis = ctx.request.body.zimi
  let table = (source == "tmp" ? 'zimi_tmp' : 'zimi')
  let addzimiid = (await zimimysql(table).max('zimi_id as maxid'))[0].maxid
  for (zimi of zimis) {
    console.log(addzimiid);
    await zimimysql(table)
      .insert({ midi: zimi.midi, question: zimi.question, answer: zimi.answer, zb: zimi.zb, zongheng: zimi.zongheng, midi_length: zimi.midi_length, zimi_id: addzimiid + 1 })
  }
}
module.exports = tianzi_add