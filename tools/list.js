const fs = require('fs')
const path = require('path')
const imageSize = require('image-size')

class FsWrapper {
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

class ListSort {
  compare(a, b) {
    const re = new RegExp('^lighthouse-(\\d+?)_(\\d+?)\\.(\\w+?)$')

    const result1 = re.exec(a)
    const result2 = re.exec(b)

    const id1 = parseInt(result1[1])
    const id2 = parseInt(result2[1])

    if (id1 < id2) return -1
    if (id1 > id2) return 1
    return 0
  }
}

function main() {
  const cwd = process.cwd()
  console.log('cwd', cwd)

  const READ_DIR = path.join(cwd, '../static/images/sharp/')
  const OUTPUT_FILE = path.join(cwd, '../imageList.js')
  const MAX_IMAGE_COUNT = 30

  const fw = new FsWrapper()
  const imageNameList = fw.readDir(READ_DIR)

  const ls = new ListSort()
  imageNameList.sort(ls.compare)

  const output = []
  let i = 0

  while (i < MAX_IMAGE_COUNT) {
    const imageName = imageNameList[i]

    const imagePath = path.join(READ_DIR, imageName)
    const dimensions = imageSize(imagePath)

    output.push({
      src: '/images/sharp/' + imageName,
      height: dimensions.height.toString(),
      width: dimensions.width.toString(),
      alt: imageName,
    })

    i++
  }

  const data = 'export default ' + JSON.stringify(output)
  fw.writeFile(OUTPUT_FILE, data)
}

main()
