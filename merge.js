
const Exec = require("child_process").exec

/**
 * 调用python脚本来合并pdf文件
 * @param {String} sourcePath 需要合并的pdf文件所在的目录
 * @param {String} outputFile 导出合并后的文件名称
 */

async function ExecPy(sourcePath, outputFile) {
    return new Promise((resolve, rejects) => {
        Exec("python ./merge.py " + sourcePath + " " + outputFile, (err, stdout, stderr) => {
            resolve(stdout)
        })
    })
}

module.exports = {
    ExecPy
}