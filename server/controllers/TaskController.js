// import _boardService from '../services/BoardService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
// import ListService from '../services/ListService'
import TaskService from '../services/TaskService'


// let _listService = new ListService().repository
let _taskService = new TaskService().repository

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      // .get('/:id/tasks', this.getAllTasks)
      // .get('/:id', this.getById)
      .post('', this.create)
      .post('/:id/comments', this.createComment)
      .put('/:id/comments', this.deleteComment)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
    // .use(this.defaultRoute)
  }


  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.create(req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async createComment(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, { $push: { comments: req.body } }, { new: true })
      if (data) {
        return res.send(data)
      }

    } catch (error) { next(error) }
  }
  async deleteComment(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, { $pull: { comments: req.body } }, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error('Invalid data')
    } catch (error) { next(error) }

  }
  async edit(req, res, next) {
    try {
      let data = await _taskService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await _taskService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      if (data) {
        return res.send("Task Deleted")
      }
    }
    catch (err) { next(err) }
  }

}


