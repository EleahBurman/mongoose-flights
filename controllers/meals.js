import { Meal } from "../models/meal.js"

function create(req, res) {
  Meal.create(req.body)
  .then(performer => {
    res.redirect('/meals/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/meals/new')
  })
}

export {
  create
}