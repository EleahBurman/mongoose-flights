import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

// GET http://localhost:3000/performers/new
router.get('/new', mealsCtrl.new)
// POST http://localhost:3000/performers
router.post('/', mealsCtrl.create)

export {
  router
}