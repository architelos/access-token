const token = require('./core.js')

token(function(accessToken) {
    console.log(accessToken); // access token is now stored in accessToken // If there was an error, accessToken will be "Could not generate access token."
    // Remember that an access token only lasts 12 hours and can only be generated 4-5 times per day.
}
