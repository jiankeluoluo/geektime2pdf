const mergePDF = require("./merge")
const utils = require('./utils');

// 测试调用python脚本

(async function () {
    res = await mergePDF.ExecPy("./download/article/geektime_打造爆款短视频", "./download/pdf/周维·打造爆款短视频.pdf");
    utils.Log(res)
})()