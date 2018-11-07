const zimimysql = require('../zmmysql')

async function question_delete(ctx, next) {
  let wordItem = ctx.request.body
  console.log(wordItem);
  await zimimysql('question_tags')
      .where({question_id:wordItem.question_id})
      .del()
  await zimimysql('questions')
      .where({question_id:wordItem.question_id})
      .del()
}
module.exports = question_delete