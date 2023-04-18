import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"
function newFlight(req, res){
  const newFlight = new Flight ()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0,16).replace('T', ' ')
  res.render('flights/new', {title: 'Add Flight', departsDate})
  }

function create(req,res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight =>{
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function index(req,res){
  Flight.find({})
  .then(flights=>{
    flights.sort((a,b) => a.departs - b.departs)
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res){
  Flight.findById(req.params.flightId)
  .populate('food')
  .then(flight =>{
    Meal.find({_id: {$nin: flight.food}})
      .then(meals =>{
        res.render('flights/show', {
          title: 'Flight Detail',
          flight: flight,
          meals: meals,
        })
      })
    .catch(err => {
    console.log(err)
    res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight =>{
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    res.render('flights/edit',{
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight =>{
    req.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function createTicket (req,res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    console.log(flight)
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect (`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export{
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket
}