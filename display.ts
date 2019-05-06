/**
 * Defines useful display functions for Micro:bit
 */

//% weight=100 color=#0fbc11 icon="\uf1ec" 
namespace display {
    /**
     * Display a radio signal level on the LED display
     * @param signal the radio signal level
     * @param lower the lower range of signal
     * @param upper the upper range of signal
     */
    //% block
    export function showSignal(signal: number, lower: number, upper: number) {
        let leds: number

        // First rebase to 0
        leds = signal - lower

        // Then convert to 0-25
        leds = leds * 25 / (upper - lower)

        // Switch on the leds starting at the bottom left
        // This covers the range from 0-25
        show(leds)
    }

    // Ensure that we always clear the screen on the first execution
    let lastValue = 100

    /**
     * Display a number from 0-25 on the LED display
     * @param value the number to show
     */
    //% block
    export function show(value: number) {
        if (value < lastValue) {
            basic.clearScreen()
        }

        lastValue = value

        // x is remainder after dividing by 5
        // y is floor(divide by 5), "4 -" reverses the direction
        for (let draw: number = 0; draw < value; draw++) {
            led.plot(draw - Math.floor(draw / 5) * 5, 4 - Math.floor(draw / 5))
        }
    }

    /**
     * Display a directional line on the display
     * @param direction the direction to draw the line
     * 0-15 where 0 is upwards and moving clockwise
     */
    //% block
    export function drawArrow(direction: number) {

        let xData = [2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 1]
        let yData = [0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0]

        let x: number = xData[direction]
        let y: number = yData[direction]

        basic.clearScreen()

        // Centre
        led.plotBrightness(2, 2, 255);

        // Intermediate
        let xI = (x + 2) / 2
        let yI = (y + 2) / 2

        led.plotBrightness(xI, yI, 255)

        // Edge
        led.plotBrightness(x, y, 255)
    }
}
