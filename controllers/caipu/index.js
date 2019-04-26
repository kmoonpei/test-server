const { allCaipu,caipuDetail } = require('./caipu');
const caipu_collect = require('./caipu.collect');
const caipu_search = require('./caipu.serach')
const caipu = {
    allCaipu,
    caipuDetail,
    caipu_collect,
    caipu_search,
}
module.exports = caipu;