// define modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

// setting port
const app = express()
const PORT = 3000

// setting body-parser
app.use((bodyParser.urlencoded({ extended: false })))
app.use(bodyParser.json())

// setting express-handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.use(express.static('public'))

// setting router
require('./routes')(app)

// listen server
app.listen(PORT, () => {
  console.log(`The server is working on the localhost:${PORT}`)
})
