// Draw an up-arrow
display.drawArrow(0)
basic.pause(500)

// Draw a down arrow
display.drawArrow(8)
basic.pause(500)

// Draw a north-west arrow
display.drawArrow(15.6)
basic.pause(500)

// Draw a dot for invalid parameters
display.drawArrow(-1)
basic.pause(200)
basic.clearScreen()
basic.pause(200)

display.drawArrow(20)
basic.pause(200)
basic.clearScreen()
basic.pause(200)

// Slowly increase and decrease the number being displayed
for (let i: number = 0; i < 51; ++i) {
    let j: number = i < 25 ? i : 50 - i
    display.show(j)
    basic.pause(10)
}

// Show a gradually increasing signal strength
for (let signalStrength: number = -128; signalStrength < -46; ++signalStrength) {
    display.showSignal(signalStrength, -128, -46)
    basic.pause(10)
}

// Encoding/decoding images
basic.showIcon(IconNames.Heart)

let strDiamond: string = display.encodeImage(images.iconImage(IconNames.Diamond))
let diamond: Image = display.decodeImage(strDiamond)

let strImage = `
* * . . .
. . . . .
. . # . .
. . . . .
. . . . *
`
let image = display.decodeImage(strImage)

let strTooShort = `* * .  *`
let tooShort = display.decodeImage(strTooShort)

let strToolong = `
* * . . .
. . . . .
. . # . .
. . . . .
. . . . * * * * *
`
let tooLong = display.decodeImage(strToolong)

let strInvalid = "hello"
let invalid = display.decodeImage(strInvalid)

diamond.showImage(0)
basic.pause(250)
image.showImage(0)
basic.pause(250)
tooShort.showImage(0)
basic.pause(250)
tooLong.showImage(0)
basic.pause(250)

// Done!
basic.clearScreen()
