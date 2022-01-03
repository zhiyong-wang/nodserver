const zimimysql = require('../zmmysql')

async function appearModel_list(ctx, next) {
  let appearGrids = await zimimysql('appear')
    .select('id','disappear_grids')
    .orderBy('id');
  ctx.state.data = appearGrids;
  console.log(ctx.state.data);
}
module.exports = appearModel_list