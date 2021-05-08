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
     * Switches on the number of leds specified in the parameter
     * @param value the number of leds to switch on
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

        basic.clearScreen()

        // Centre
        led.plotBrightness(2, 2, 255);

        if ((direction >= 0) && (direction < 16)) {
            direction = Math.trunc(direction)

            let x: number = xData[direction]
            let y: number = yData[direction]

            // Intermediate
            let xI = (x + 2) / 2
            let yI = (y + 2) / 2

            led.plotBrightness(xI, yI, 255)

            // Edge
            led.plotBrightness(x, y, 255)
        }
    }

    /**
     * Encode an Image to a string
     */
    //% block
    export function encodeImage(image: Image): string {
        let result = ""

        for(let y: number = 0; y < 5; ++y)
        {
            for(let x: number = 0; x < 5; ++x)
            {
                result += image.pixel(x, y) ? "*" : "."
            }
        }

        return result
    }

    /**
     * Convert an image encoded in a string to an actual Image
     * images.createImage should do this, but appears to be hard-coded to only 
     * accept strings that the compiler can confirm are real images
     */
    //% block
    export function decodeImage(str: string): Image {
        // We'll need to use the Microbit's screen
        // (far from ideal but I can't work out any better way)
        let enableCharacters: string = "1#*"

        // Remove extraneous characters
        str = str.replaceAll(" ", "")
        str = str.replaceAll("\n", "")

        // First keep what's on the screen so we can restore it afterwards
        let existingDisplay: Image = led.screenshot()
        basic.clearScreen()

        // Now display the image encoded in str and take a screenshot of it
        for(let i: number = 0; i < Math.min(25, str.length); ++i)
        {
            if(enableCharacters.includes(str.charAt(i)))
            {
                led.plot(i - Math.floor(i / 5) * 5, Math.floor(i / 5))
            }
        }

        let image: Image = led.screenshot()

        // Finally restore the screen
        existingDisplay.showImage(0)

        return image
    }
}
