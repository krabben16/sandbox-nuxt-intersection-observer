// https://tech.arc-one.jp/asepct-ratio/

function calcGcd(x, y) {
  if (y === 0) return x
  return calcGcd(y, x % y)
}

function main() {
  const targetRatio = {
    w: 16,
    h: 9,
  }

  const MAX_WIDTH = 1000
  let width = 1
  const height = 180

  while (width < MAX_WIDTH) {
    const gcd = calcGcd(width, height)

    const ratio = {
      w: width / gcd,
      h: height / gcd,
    }

    if (ratio.w === targetRatio.w && ratio.h === targetRatio.h) {
      console.log(width, height)
    }

    width++
  }
}

main()
