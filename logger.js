"use strict";
// logger component
exports.__esModule = true;
function Logger() {
    var evtSeries = new Array();
    //High Order function Logger() returns this event logger utility
    return function (evtType) {
        //5 minute event series threshhold (in milliseconds)
        var baseLimit = 300000;
        var timestampT = new Date().getTime();
        var timestamp = timestampT.toString();
        var thresholdT = timestampT - baseLimit;
        //remove any event older than 5 minutes
        for (var evtIndex = evtSeries.length; evtIndex > 0; evtIndex--) {
            if (evtSeries[0] < thresholdT) {
                evtSeries.shift();
            }
            else {
                break;
            }
        }
        //set successMsg to timestamp if adding event to series, otherwise set it to the event count
        var successMsg;
        if (typeof evtType != 'undefined') {
            if (typeof evtType == 'number') {
                var seriesLimit = evtType;
                if (seriesLimit > baseLimit) {
                    seriesLimit = baseLimit;
                }
                var eventLimit = timestampT - seriesLimit;
                var eventCount = 0;
                for (var evtIndex = evtSeries.length; evtIndex > 0; evtIndex--) {
                    if (evtSeries[evtIndex - 1] >= eventLimit) {
                        eventCount++;
                    }
                    else {
                        break;
                    }
                }
                successMsg = '{"timestamp": "' + timestamp + '", "count": "' + eventCount + '"}';
            }
            else {
                successMsg = '{}';
            }
        }
        else {
            evtSeries.push(timestamp);
            successMsg = '{"timestamp": "' + timestamp + '"}';
        }
        return (successMsg);
    };
}
//exports["default"] = Logger;
module.exports = Logger
