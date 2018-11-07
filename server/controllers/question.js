const zimimysql = require('../zmmysql')

async function get(ctx, next) {
    
let id=ctx.params.id;
     console.log(id);
    let wordItem =  await zimimysql('questions')
      .first('question_id','midi','question','answer', 
      zimimysql.raw('(select group_concat(question_tags.tag_id) from question_tags where question_tags.question_id=questions.question_id) as tags'))
      .where('question_id',id);
    console.log(wordItem);
    ctx.state.data = wordItem;
}
async function post(ctx, next) {
  let wordItem= ctx.request.body
   console.log(wordItem);
  await zimimysql('questions')
        .where('question_id',wordItem.question_id)
        .update({ midi: wordItem.midi, question: wordItem.question, answer: wordItem.answer})
  await zimimysql('question_tags')
        .where( 'question_id',wordItem.question_id)
        .del();
  for (tagId of wordItem.tags.split(",")){
      let tag_id=Number(tagId)
      if (tag_id){
      await zimimysql('question_tags')
         .insert({ question_id:wordItem.question_id, tag_id: tag_id});
       }   
    }
    } 
module.exports = {
  post,
  get
}