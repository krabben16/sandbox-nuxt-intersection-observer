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
    this.width = 348
    this.height = 225
  }

  convert(writeDir, readDir, imageName) {
    const imagePath = path.join(readDir, imageName)

    sharp(imagePath)
      .resize(this.width, this.height, { fit: 'cover' })
      .toFile(path.join(writeDir, this.createImageName(imageName)))
  }

  createImageName(imageName) {
    return imageName.split('_')[0] + '_' + this.width + '.jpg'
  }
}

function main() {
  const cwd = process.cwd()
  console.log('cwd', cwd)

  const WRITE_DIR = path.join(cwd, '../static/images/sharp/')
  const READ_DIR = path.join(cwd, '../static/images/sample/')

  const fw = new FsWrapper()
  const imageNameList = fw.readDir(READ_DIR)

  imageNameList.forEach((imageName) => {
    const sw = new SharpWrapper()
    sw.convert(WRITE_DIR, READ_DIR, imageName)
  })
}

main()
