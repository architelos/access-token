const token = require('./core.js')

token(function(accessToken) {
    console.log(accessToken); // access token is now stored in accessToken // If there was an error, accessToken will be "Could not generate access token."
}
