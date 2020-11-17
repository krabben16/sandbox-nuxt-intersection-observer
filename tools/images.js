const fs = require('fs')
const path = require('path')
const imageSize = require('image-size')

class ImageReader {
  constructor() {
    this.charCode = 'utf-8'
  }

  readDir(dir) {
    return fs.readdirSync(dir, this.charCode)
  }

  writeFile(path, data) {
    fs.writeFileSync(path, data, this.charCode)
  }
}

function main() {
  const cwd = process.cwd()
  const READ_DIR = path.join(cwd, '../static/images/sample/')
  const OUTPUT_FILE = path.join(cwd, '../imageList.js')
  const MAX_IMAGE_COUNT = 30

  console.log('cwd', cwd)

  const ir = new ImageReader()
  const images = ir.readDir(READ_DIR)

  const output = []

  images.forEach((i) => {
    if (output.length === MAX_IMAGE_COUNT) {
      return
    }

    const imagePath = path.join(READ_DIR, i)
    console.info(imagePath)

    const dimensions = imageSize(imagePath)
    console.info(dimensions)

    output.push({
      src: '/images/sample/' + i,
      height: dimensions.height.toString(),
      width: dimensions.width.toString(),
      alt: i,
    })
  })

  const data = 'export default ' + JSON.stringify(output)

  ir.writeFile(OUTPUT_FILE, data)
}

main()
