const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../models')
const User = db.User

const userController = {
  loginPage: (req, res) => {
    res.render('../views/user/login')
  },
  login: (req, res) => {
    passport.authenticate('local', {
      successRedirect: '/todo',
      failureRedirect: '/login'
    })(req, res)
  },
  registerPage: (req, res) => {
    res.render('../views/user/register')
  },
  register: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
      return res.render('../views/user/register', { errors, name, email })
    }
    if (!email.match(/.+@.+\..+/)) {
      errors.push({ message: '請填入正確的信箱' })
      return res.render('../views/user/register', { errors, name, email })
    }
    if (!password.match(/.{8}/)) {
      errors.push({ message: '密碼需要8位數' })
      return res.render('../views/user/register', { errors, name, email })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
      return res.render('../views/user/register', { errors, name, email })
    }
    try {
      const user = await User.findOne({ where: { email } })
      if (user) {
        errors.push({ message: '這個帳號已經註冊過了。' })
        console.log('User already exists')
        return res.render('../views/user/register', { errors, name, email })
      }
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      User.create({ name, email, password: hashPassword })
      res.render('../views/user/login', { success_msg: '帳號註冊成功' })
    } catch (e) {
      console.log(e)
    }
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/login')
  }
}

module.exports = userController
