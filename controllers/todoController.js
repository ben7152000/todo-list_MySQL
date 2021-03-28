const todoController = {
  getTodo: (req, res) => {
    res.render('../views/todo')
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
