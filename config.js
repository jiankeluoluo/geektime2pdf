/**
 * 需要转换为 pdf 的配置信息 
 */
module.exports = {
    url: 'https://time.geekbang.org/serv/v1/article', // 该配置项不需要改动
    infoUrl: 'https://time.geekbang.org/serv/v3/column/info', // 该配置项不需要改动
    commentUrl: 'https://time.geekbang.org/serv/v1/comments', // 该配置项不需要改动
    columnBaseUrl: 'https://time.geekbang.org/column/article/', // 该配置项不需要改动
    firstArticalId: 0, //专栏第一篇文章的ID
    columnName: '',//可不填，会自动获取
    isdownloadVideo: true, // 是否下载音频
    isComment: false, // 是否导出评论
    commentCount: 0, // 评论导出数量，最大20个
    cookie: ''
};
