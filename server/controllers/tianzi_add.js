const zimimysql = require('../zmmysql')

async function tianzi_add(ctx, next) {
  let source = ctx.request.body.source
  let zimis = ctx.request.body.zimi
  let table;
   switch(source){
   case 'tianzi_model':table="model";break;
   case 'tianzi_tmp':table="zimi_tmp";break;
   case 'tianzi_http':table="zimi";break;
  }
  let addzimiid = (await zimimysql(table).max('zimi_id as maxid'))[0].maxid
  for (zimi of zimis) {
   // console.log(addzimiid);
    await zimimysql(table)
      .insert({ midi: zimi.midi, question: zimi.question, answer: zimi.answer, zb: zimi.zb, zongheng: zimi.zongheng, midi_length: zimi.midi_length, zimi_id: addzimiid + 1 })
  }
}
module.exports = tianzi_add