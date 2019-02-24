const zimimysql = require('../zmmysql')

async function question_list(ctx, next) {
   let select_tag=ctx.request.query.tags
   let page=Number(ctx.request.query.page)
   let peritem=Number(ctx.request.query.peritem)
   console.log(ctx.request.query);
  
  if (select_tag) {

	let question_list = await zimimysql('questions')
	    .select('question_id','midi','question','answer',
	     zimimysql.raw('(select group_concat(question_tags.tag_id order by question_tags.tag_id asc) from question_tags where question_tags.question_id=questions.question_id) as tags'))
	     .havingRaw('tags like ?','%'+select_tag+'%')
	    .orderBy('midi')
	  ctx.state.data = {'question_count':question_list.length,'question_list':question_list.slice((page-1)*peritem,page*peritem-1)}
  }
  else{
      let questions_count=await zimimysql('questions')
	    .count('question_id as count');

	  let question_list = await zimimysql('questions')
	    .select('question_id','midi','question','answer',
	     zimimysql.raw('(select group_concat(question_tags.tag_id order by question_tags.tag_id asc) from question_tags where question_tags.question_id=questions.question_id) as tags'))	   
	    .offset((page-1)*peritem)
	    .limit(peritem)
	    .orderBy('midi')
	  ctx.state.data = {'question_count':questions_count[0].count,'question_list':question_list}
	   }
  
  console.log(ctx.state.data);
}
module.exports = question_list
    