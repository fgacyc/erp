export function getTimeStamp() {
    let timestamp = Date.now()
    return Math.floor(timestamp / 1000)
}