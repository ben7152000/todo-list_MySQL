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
    res.send('create')
  },
  createTodo: (req, res) => {

  },
  editTodoPage: (req, res) => {
    res.send('edit')
  },
  editTodo: (req, res) => {

  },
  deleteTodo: (req, res) => {

  }
}

module.exports = todoController
