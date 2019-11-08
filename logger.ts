
// logger component

function Logger(){
    let evtSeries = new Array()
    //High Order function Logger() returns this event logger utility
    return function(evtType: any) {
        //5 minute event series threshhold (in milliseconds)
        const baseLimit = 300000

        let timestampT: number = new Date().getTime()
        let timestamp: string = timestampT.toString()

        let thresholdT: number = timestampT - baseLimit
        //remove any event older than 5 minutes
        for (let evtIndex = evtSeries.length; evtIndex > 0; evtIndex--){
            if (evtSeries[0] < thresholdT){
                evtSeries.shift()
            }
            else {
                break
            }
        }

        //set successMsg to timestamp if adding event to series, otherwise set it to the event count
        let successMsg: string
        if (typeof evtType != 'undefined'){
            if (typeof evtType == 'number'){
                let seriesLimit: number = evtType
                if (seriesLimit > baseLimit){
                    seriesLimit = baseLimit;
                }
                let eventLimit = timestampT - seriesLimit
                let eventCount = 0
                for (let evtIndex = evtSeries.length; evtIndex > 0; evtIndex--){
                    if (evtSeries[evtIndex - 1] >= eventLimit){
                        eventCount++
                    }
                    else {
                        break
                    }
                }
                successMsg = '{"timestamp": "' + timestamp + '", "count": "' + eventCount + '"}'
            }
            else {
                successMsg = '{}'
            }
        }
        else {
            evtSeries.push(timestamp)
            successMsg = '{"timestamp": "' + timestamp + '"}'
        }
        return(successMsg)
    }
}

export default Logger
//module.exports = Logger

