const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

class FsWrapper {
  constructor() {
    this.charCode = 'utf-8'
  }

  readDir(dir) {
    return fs.readdirSync(dir, this.charCode)
  }
}

class SharpWrapper {
  constructor() {
    // 16:9
    this.width = 320
    this.height = 180
  }

  convert(readDir, writeDir, imageName) {
    const imagePath = path.join(readDir, imageName)

    const fileName = imageName.split('_')[0] + '.jpg'
    const filePath = path.join(writeDir, fileName)

    sharp(imagePath)
      .resize(this.width, this.height, { fit: 'cover' })
      .toFile(filePath)
  }
}

function main() {
  const cwd = process.cwd()
  console.log('cwd', cwd)

  const READ_DIR = path.join(cwd, '../static/images/sample/')
  const WRITE_DIR = path.join(cwd, '../static/images/sharp/')

  const fw = new FsWrapper()
  const imageNameList = fw.readDir(READ_DIR)

  imageNameList.forEach((imageName) => {
    const sw = new SharpWrapper()
    sw.convert(READ_DIR, WRITE_DIR, imageName)
  })
}

main()
