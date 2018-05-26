var homedata = require('./home.json');
var list1 = require('./recommend1.json');
var list2 = require('./recommend2.json');
var list3 = require('./recommend3.json');
var searchkey = require('./searchKey.json');
var search = require('./search.json');
var detail = require('./352876.json');
var content1 = require('./reader/data1.json');
var content2 = require('./reader/data2.json');
var content3 = require('./reader/data3.json');
var content4 = require('./reader/data4.json');
var menu = require('./chapter-list.json');
var mokdata = {
    '/book/index': homedata,
    '/book/list?page=1&limit=10': list1,
    '/book/list?page=2&limit=10': list2,
    '/book/list?page=3&limit=10': list3,
    '/book/searchkey': searchkey,
    '/book/search': search,
    '/book/detail?activeid=352876': detail,
    '/book/content?cont=1': content1,
    '/book/content?cont=2': content2,
    '/book/content?cont=3': content3,
    '/book/content?cont=4': content4,
    '/book/menu': menu

}
module.exports = function(url) {
    //console.log(url)
    if (/\/book\/search\?/.test(url)) {
        url = '/book/search'
    }
    return mokdata[url]
}