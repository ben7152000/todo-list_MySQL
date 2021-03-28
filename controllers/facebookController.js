const passport = require('passport')

const facebookController = {
  facebookAuthenticator:
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
  facebookCallback:
    passport.authenticate('facebook', {
      successRedirect: '/todo',
      failureRedirect: '/login'
    })
}

module.exports = facebookController
