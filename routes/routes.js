// modules
const express = require('express')
const router = express.Router()

// controller
const userController = require('../controllers/userController')
const todoController = require('../controllers/todoController')

// home
router.get('/', (req, res) => res.redirect('/login'))

// todo
router.get('/todo', todoController.getTodo)
router.get('/todo/create', todoController.createTodoPage)
router.post('/todo.create', todoController.createTodo)
router.get('/todo/:id/edit', todoController.editTodoPage)
router.post('/todo/:id/edit', todoController.editTodo)
router.post('/todo/:id/delete', todoController.deleteTodo)

// login
router.get('/login', userController.loginPage)
router.post('/login', userController.login)
router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

module.exports = router
