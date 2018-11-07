const zimimysql = require('../zmmysql')

async function tag_delete(ctx, next) {
  console.log('tag');
  let tag = ctx.request.body
  console.log(tag);
  await zimimysql('question_tags')
      .where({tag_id:tag.tag_id})
      .del()
  await zimimysql('tags')
      .where({tag_id:tag.tag_id})
      .del()
}
module.exports = tag_delete