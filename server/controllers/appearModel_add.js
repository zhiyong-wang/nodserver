const zimimysql = require('../zmmysql')

async function appearModel_add(ctx, next) {
  let disappear_grids = ctx.request.body
  
  let add_grids=disappear_grids.grids.join()

  console.log(add_grids);
  await zimimysql('appear')
      .insert({ disappear_grids: add_grids});
  
 
}   
module.exports = appearModel_add