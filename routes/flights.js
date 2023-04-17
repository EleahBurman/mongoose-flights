import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

// GET localhost:3000/users
router.get('/', function(req, res) {
  res.send('respond with a resource')
})
// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)
// POST localhost:3000/flights
router.post('/', flightsCtrl.create)
export { router }
