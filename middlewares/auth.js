const checkAuthenticator = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  req.flash('warning_msg', '請先登入才能使用！')
  return res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return res.redirect('/') }
  return next()
}

const checkAccount = (req, res, next) => {
  const { email, password } = req.body
  if (!email && !password) {
    req.flash('warning_msg', '請輸入信箱與密碼')
    return next()
  }
  if (!password) {
    req.flash('warning_msg', '請輸入密碼')
    return next()
  }
  if (!email) {
    req.flash('warning_msg', '請輸入帳號')
    return next()
  }
  return next()
}

module.exports = { checkAuthenticator, checkNotAuthenticated, checkAccount }
