
const Logger = require('./logger.js')
let eventLogger = Logger()

let exitCode: number = 0

if (exitCode == 0){
    //check to see if we get a timestamp back when adding an event to the series
    console.log('1st test: Check to see if we get a timestamp property on the return event status')
    let nextEventStr = eventLogger()
    let nextEvent = JSON.parse(nextEventStr)

    if (typeof nextEvent.timestamp != 'undefined'){
        console.log('1st test passed: ' + nextEvent.timestamp)
    }
    else {
        console.log('1st test failed, no timestamp.')
        exitCode = 1
    }
}

if (exitCode == 0){
    //check to see if we get a timestamp and count back when we query the count
    console.log('1st test: Check to see if we get a timestamp and count property returned from the query.')
    let throttle = 60000
    let countTestStr = eventLogger(throttle)
    let countTest = JSON.parse(countTestStr)

    if (typeof countTest.timestamp != 'undefined'){
        if (typeof countTest.count != 'undefined'){
            console.log('2nd test passed: ' + countTestStr)
        }
    }
    else {
        console.log('2nd test failed, incorrect JSON.')
        exitCode = 1
    }
}

if (exitCode == 0){
    //set up 3 more events
    console.log('3rd test: Add and get 3 more events, for a total of 4 events.')
    eventLogger()
    eventLogger()
    eventLogger()

    let maxseries = 60000
    let firstCountStr = eventLogger(maxseries)
    let firstCount = JSON.parse(firstCountStr)
    if (firstCount.count == 4){
        console.log('3rd test passed: ' + firstCount.count + ' events counted.')
    }
    else {
        console.log('3rd test failed, event count is incorrect.')
        exitCode = 1
    }
}

process.exit(exitCode)

