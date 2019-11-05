# phi-events

phi-events is a utility logger to compare streams of events, for Node/Express and React routers.

It can be installed via git clone or NPM install.

#### `GitHub: git clone https://github.com/turing-mine/phi-events.git`

#### `NPM: npm install phi-events`

After an npm install your app's package.json should contain the dependency "phi-events": "^1.8.2"


## Files and scripts

phi-events is comprised of two Node scripts, including their corresponding TypeScript files

### logger.js

In your app, you can either import or require this module:

#### `import Logger from 'phi-events'`

#### `const Logger = require('phi-events')`

### test-logger.js

test-logger.js can be run with the NPM test script command:

#### `npm test`

This test will perform 3 sanity checks, making sure events are being recorded, and returning the correct response payload.

## Compiling

This module also includes logger.ts and test-logger.ts in the GitHub project.  After installing it in your app, copy the ts files to your app's node_modules/phi-events directory, and run 

#### `node_modules/typescript/bin/tsc node_modules/phi-events/logger.ts`

## Usage

To begin using the logger function, add the following line to your code:

#### `let eventLogger = Logger()`

To add an event to the event series, call the function without any arguments:

#### `eventLogger()`

To get a series count for a pre-determined time span, pass the timespan in milliseconds.  For instance, to get a count of the last 5 minutes of logged events, add this line to your code:

#### `eventLogger(300000)`

## logger responses

The logger will return two types of data, depending on the request.

For eventLogger(), the logger will add a single timestamped event to the series, and return a string representation of a json object containing the timestamp:

#### `{"timestamp": "1572323990919"}`

For eventLogger(300000) (or any timespan in milliseconds), the following string will be returned with the series count for that timespan:

#### `{"timestamp": "1572323990919", "count": "42"}`

## Caveats

The timespan of the event series is limited to the last 5 minutes of events.  This value can be changed in one line of the logger.js file:

#### `var baseLimit = 300000`

This is the upper-limit of the series count that can be returned.  Also, any event that is past the 5 minutes span of the current request will not be counted, and the entire series is periodically trimmed to the last 5 minutes from the current time.

