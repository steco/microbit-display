// Draw an up-arrow
Display.drawArrow(0)
basic.pause(1000)

// Draw a down arrow
Display.drawArrow(8)
basic.pause(1000)

// Slowly increase and decrease the number being displayed
for (let i: number = 0; i < 51; ++i) {
    let j: number = i < 25 ? i : 50 - i
    Display.show(j)
    basic.pause(100)
}
