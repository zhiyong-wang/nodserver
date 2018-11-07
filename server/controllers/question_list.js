const zimimysql = require('../zmmysql')

async function question_list(ctx, next) {
  //let source = ctx.params.source;
  let question_list = await zimimysql('questions')
    .select('question_id','midi','question','answer',
     zimimysql.raw('(select group_concat(question_tags.tag_id) from question_tags where question_tags.question_id=questions.question_id) as tags'))
    .orderBy('midi');
  ctx.state.data = question_list
  console.log(ctx.state.data);
}
module.exports = question_list

