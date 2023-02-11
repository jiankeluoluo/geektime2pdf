/**
 *  生成 PDF 的工具方法
 */
const puppeteer = require('puppeteer');
const path = require('path');
const utils = require('./utils');

/**
 * 生成 pdf
 * @param {Object} data 生产 pdf 需要的文章数据
 * @param {String} filename 生成 pdf 的名称
 * @param {dirname} dirname 生成 pdf 存放的文件夹 名称
 * @param {Oject} options ejs 渲染模版的配置项
 */

async function generaterPdf(data, filename = 'example.pdf', dirname = __dirname, options = {}) {
    utils.Log('Generater PDF Start');
    // utils.Log('data', JSON.stringify(data));
    let browser, page;
    try {
        browser = await puppeteer.launch({
            //   headless: false
        });
        page = await browser.newPage();
        utils.Log("填充文章内容...")
        await page.setContent(utils.renderEjsArticle2Html(data, options));
        await utils.sleep(2);
        utils.Log("开始生成PDF", filename)
        await page.pdf({ path: path.resolve(dirname, filename) });
        utils.Log('Generater PDF Success');
        // 关闭浏览器资源
        await page.close();
        await browser.close();
    } catch (err) {
        utils.Log('Generater PDF 生成失败', err);
        page ? page.close() : '';
        browser ? browser.close() : '';
    };
};

module.exports = generaterPdf;