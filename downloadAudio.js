const path = require('path');
const superagent = require('superagent');
const fs = require('fs');
const utils = require('./utils');

/**
 * 下载对应的音频文件
 * @param {String} url 音频文件的地址
 * @param {String} fileName 文件名称
 * @param {String} fileDir 保存文件夹地址
 */

const downloadAudio = async (url, fileName, fileDir = __dirname) => {
   utils.Log('开始下载 音频文件: ', fileName);
   if (!url) throw '请传入一个音频地址';
   if (path.extname(fileName) !== '.mp3') { // 判断传的文件后缀是否是 mp3
      fileName = fileName + '.mp3';
   };
   let filePath = path.resolve(fileDir, fileName);
   let writeStream = fs.createWriteStream(filePath);
   superagent.get(url).pipe(writeStream);
   utils.Log('结束下载 音频文件: ', fileName);
};

module.exports = downloadAudio;