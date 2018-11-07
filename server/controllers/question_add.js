const zimimysql = require('../zmmysql')

async function question_add(ctx, next) {
  let wordItem = ctx.request.body
  console.log(ctx.request.body);
  await zimimysql('questions')
      .insert({ midi: wordItem.midi, question: wordItem.question, answer: wordItem.answer});
  
  if (wordItem.tags.length>0){
   let questionId=await zimimysql('questions').max('question_id as id')
   console.log(questionId);
   let id=questionId[0]['id']
   for (tagId of wordItem.tags.split(",")){
   	  let tag_id=Number(tagId)
   	  if (tag_id){
      await zimimysql('question_tags')
         .insert({ question_id:id, tag_id: tag_id});
       }   
    }
   }   

}   
module.exports = question_add
