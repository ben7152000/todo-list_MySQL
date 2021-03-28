const db = require('../models')
const Todo = db.Todo

const todoController = {
  getTodo: async (req, res) => {
    const UserId = req.user.id
    try {
      const todo = await Todo.findAll({ raw: true, nest: true, where: { UserId } })
      res.render('../views/todo', { todo })
    } catch (e) {
      console.log(e)
    }
  },
  createTodoPage: (req, res) => {
    res.render('../views/todo/create')
  },
  createTodo: async (req, res) => {
    const UserId = req.user.id
    const name = req.body.name
    try {
      await Todo.create({ name, UserId })
      res.redirect('/')
    } catch (e) {
      console.log(e)
    }
  },
  editTodoPage: async (req, res) => {
    const UserId = req.user.id
    const id = req.params.id
    try {
      const todo = await Todo.findOne({ where: { id, UserId } })
      res.render('../views/todo/edit', { todo })
    } catch (e) {
      console.log(e)
    }
  },
  editTodo: (req, res) => {

  },
  deleteTodo: async (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    try {
      const todo = await Todo.findOne({ where: { userId, id } })
      await todo.destroy()
      res.redirect('/')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = todoController
