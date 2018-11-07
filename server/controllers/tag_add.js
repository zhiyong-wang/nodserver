const zimimysql = require('../zmmysql')

async function tag_add(ctx, next) {
  let tag = ctx.request.body
  console.log(tag);
  await zimimysql('tags')
      .insert({tag_title:tag.tag_title});
}      
module.exports = tag_add