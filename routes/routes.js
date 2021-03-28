const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const todoController = require('../controllers/todoController')
const facebookController = require('../controllers/facebookController')
const googleController = require('../controllers/googleController')

const { checkAuthenticator, checkNotAuthenticated, checkAccount } = require('../middlewares/auth')

router.get('/', checkNotAuthenticated, (req, res) => res.redirect('/login'))

router.get('/todo', checkAuthenticator, todoController.getTodo)
router.get('/todo/create', checkAuthenticator, todoController.createTodoPage)
router.post('/todo.create', checkAuthenticator, todoController.createTodo)
router.get('/todo/:id/edit', checkAuthenticator, todoController.editTodoPage)
router.post('/todo/:id/edit', checkAuthenticator, todoController.editTodo)
router.post('/todo/:id/delete', checkAuthenticator, todoController.deleteTodo)

router.get('/login', checkNotAuthenticated, userController.loginPage)
router.post('/login', checkAccount, userController.login)
router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

router.get('/auth/facebook', checkNotAuthenticated, facebookController.facebookAuthenticator)
router.get('/auth/facebook/callback', checkNotAuthenticated, facebookController.facebookCallback)

router.get('/auth/google', checkNotAuthenticated, googleController.googleAuthenticator)
router.get('/auth/google/callback', checkNotAuthenticated, googleController.googleCallback)

module.exports = router
