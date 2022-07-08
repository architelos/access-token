const md5 = require('md5')
const axios = require('axios').default
const parser = require("xml-parse");

function generateDeviceKey(length) {
    var result = ''
    var char = 'abcdef0123456789'
    var charLen = char.length

    for ( var i = 0; i < length; i++ ) {
        result += char.charAt(Math.floor(Math.random() * charLen))
     }
     return result
}

function generateDeviceChecksum(dKey, cKey, dTime, dType) {
    var str = dKey + dTime + dType + cKey + 'savysoda'
    var res = md5(str)
    return res
}

function generateRequestURL() {
    var date = new Date()

    var dateTime = date.toISOString().slice(0, -5)
    var deviceKey = generateDeviceKey(16)
    var checksumKey = '5343'
    var deviceType = 'DeviceTypeAndroid'
    var deviceChecksum = generateDeviceChecksum(deviceKey, checksumKey, dateTime, deviceType)
    var requestURL = 'https://api.pixelstarships.com/UserService/DeviceLogin11?deviceKey=' + deviceKey + '&clientDateTime=' + dateTime + '&advertisingKey=&isJailBroken=False&checksum=' + deviceChecksum + '&deviceType=' + deviceType + '&signal=False&languageKey=en&refreshToken=&appsFlyerId=&lat=False&osVersion=&locale=en_US&deviceName=&build='
    return requestURL
}

async function request(url) {
    return await axios.post(url).then(res => {return res})
}

module.exports = function accessToken(callback) {
  var url = generateRequestURL()
  var response = request(url)
  response.then(function(result) {
    var responseData = result.data
    var parsed = parser.parse(responseData)
    var error = 'Could not generate access token.'
    var isError = parsed[0].attributes.errorMessage

    if (isError) {
      var output = error
    } else {
      var tokenXML = parser.parse(parsed[0].innerXML)
      var output = tokenXML[0].attributes.accessToken
    }
    callback(output)
  })
}
