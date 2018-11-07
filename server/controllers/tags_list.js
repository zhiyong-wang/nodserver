const zimimysql = require('../zmmysql')

async function tags_list(ctx, next) {
  let tags = await zimimysql('tags')
    .select('tag_id','tag_title')
    .orderBy('tag_id');
  ctx.state.data = tags;
  console.log(ctx.state.data);
}
module.exports = tags_list