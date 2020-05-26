// const path = require('path')
// const { existsSync, lstatSync, readdirSync } = require('fs')

// function readFileList(year, moon) {
//   const fileList = []
//   const dirPath = path.resolve(`./docs/share/${year}/${moon}/`)
//   const isDir = existsSync(dirPath) && lstatSync(dirPath).isDirectory()
//   if (!isDir) {
//     return fileList
//   }

//   const files = readdirSync(dirPath)
//   files.forEach((item) => {
//     if (path.extname(item) == '.md') {
//       const currentFile = item.slice(0, 2)
//       fileList.push([
//         `/share/${year}/${moon}/${currentFile}`,
//         `${year}年${moon}月${currentFile}日`
//       ])
//     }
//   })
//   return fileList.reverse()
// }

// module.exports = readFileList
