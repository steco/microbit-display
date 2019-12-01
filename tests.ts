// Draw an up-arrow
display.drawArrow(0)
basic.pause(500)

// Draw a down arrow
display.drawArrow(8)
basic.pause(500)

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

// Done!
basic.clearScreen()
