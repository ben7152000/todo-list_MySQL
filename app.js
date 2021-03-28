const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const userPassport = require('./config/passport')
const flash = require('connect-flash')
const cors = require('cors')
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const app = express()
const PORT = process.env.PORT

app.use((bodyParser.urlencoded({ extended: false })))
app.use(bodyParser.json())

app.use(cors())

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.use(express.static('public'))

userPassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

require('./routes')(app)

app.listen(PORT, () => {
  console.log(`The server is working on the localhost:${PORT}`)
})
