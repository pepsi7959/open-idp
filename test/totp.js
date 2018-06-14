var base32 = require('thirty-two');

var key = 'secret key for the user';

// encoded will be the secret key, base32 encoded
var encoded = base32.encode(key);

// Google authenticator doesn't like equal signs
var encodedForGoogle = encoded.toString().replace(/=/g,'');

console.log(encodedForGoogle);

// to create a URI for a qr code (change totp to hotp if using hotp)
var uri = 'otpauth://totp/somelabel?secret=' + encodedForGoogle;
