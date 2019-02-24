const zimimysql = require('../zmmysql')

async function question_list(ctx, next) {
 //let source = ctx.params.source;

   let select_tag=ctx.request.query.tags
   let page=ctx.request.query.page
   	console.log(ctx.request.query);
  let question_list = await zimimysql('questions')
    .select('question_id','midi','question','answer',
     zimimysql.raw('(select group_concat(question_tags.tag_id order by question_tags.tag_id asc) from question_tags where question_tags.question_id=questions.question_id) as tags'))
    .orderBy('midi')
    .then(function(rows) {
    	  let list=[]
    	  if (select_tag){
    	  	for(let q of rows)
	    	  {if (q['tags']!=null &&  q['tags'].includes(select_tag))
	           list.push(q)
	    	   }
	        }
	      else{list=rows
	        }
   	      return list
         })
  ctx.state.data = question_list
  console.log(ctx.state.data);
}
module.exports = question_list
