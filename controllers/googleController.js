const passport = require('passport')

const googleController = {
  googleAuthenticator:
    passport.authenticate('google', { scope: ['email'] }),
  googleCallback:
    passport.authenticate('google', {
      successRedirect: '/todo',
      failureRedirect: '/login'
    })
}

module.exports = googleController
