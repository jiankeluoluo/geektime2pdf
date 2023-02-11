/**
 * 工具方法
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

/**
 * 暂停几秒
 */

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
};

/**
 * 创建单文件夹
 * 如果传入的参数是相对路径，在当前目录创建
 * 如果是绝对路径，就直接创建
 */

function createDir(targetDir) {
    return new Promise((resolve) => {
        if (!targetDir) throw '请传入一个文件夹名称';
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        } else {
            Log("目录已存在，跳过")
        }
        resolve()
    });
};

/**
 * 向指定的文件夹写入文件
 * @param {string} dir 需要写入的文件夹名称， 相对于项目目录的路径
 */

function writeToFile(dir, content) {
    fs.writeFileSync(path.resolve(__dirname, dir, './articleInfoList.json'), content);
};

/**
 * 传进来的是unix 时间戳 单位 为 s
 * 返回对应的年月日
 * @param {Number} unixTime
 * @returns YYYY-MM-dd
 */

function formatDate(unixTime) {
    let date = new Date(unixTime * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

// ejs 文章模版
let articleEjsTempate = fs.readFileSync('./template/article.ejs', 'utf8');

/**
 * 渲染 文章 ejs 模版 并返回 html 
 * @param {Object} 渲染 ejs 需要的数据
 * @param {options} 渲染配置项
 * @returns {String} html 页面字符串
 */
function renderEjsArticle2Html(data, options) {
    try {
        return ejs.render(articleEjsTempate, data, options);
    } catch (err) {

        throw err
    };
};

//控制台打印日志：一般级别
function Log() {
    console.log(TimeNow(), ...arguments)
    return
}

//控制台打印日志：错误日志
function LogError() {
    console.error(TimeNow(), '[Error]', ...arguments)
    return
}

//控制台打印日志：调试
function LogDebug() {
    console.debug(TimeNow(), '[Debug]', ...arguments)
    return
}

//控制台打印日志：警告
function LogWarn() {
    console.warn(TimeNow(), '[Warn]', ...arguments)
    return
}

//控制台打印日志：成功
function LogSucess() {
    console.log(TimeNow(), '[Success]', ...arguments)
    return
}

//获取指定范围内的随机数
function GetRandInt(minInt, maxInt) {
    return Math.random() * (maxInt - minInt) + minInt
}

//填充字符串
function StrPad(str, len) {
    return str.toString().padStart(len, '0')
}

//过滤字符串，保存文件名称
function ClearSaveName(str) {
    return str.replace(/\//g, '-').replace(/[* <>]/g, '_')
}

//控制台辅助函数，显示时间
function TimeNow() {
    let d = new Date;
    let arr = [StrPad(d.getHours(), 2), StrPad(d.getMinutes(), 2), StrPad(d.getSeconds(), 2), StrPad(d.getMilliseconds(), 2)];
    return arr.join(':')
}

module.exports = {
    sleep,
    createDir,
    writeToFile,
    formatDate,
    renderEjsArticle2Html,
    TimeNow,
    Log,
    LogError,
    LogDebug,
    LogWarn,
    LogSucess,
    StrPad,
    GetRandInt,
    ClearSaveName
};