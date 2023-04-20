import { Meal } from "../models/meal.js"

function newMeal(req, res){
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'Add Meal',
      meals: meals
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function create(req, res) {
  console.log(req.body.name)
  Meal.find({name: req.body.name})
  .then((meal) =>{
    console.log(meal)
    if (meal.length){
      res.render('error', {
        message: 'Meal already exists! Nice try!',
        error: {status: 'Hunger Mode Error'}
      })
    } else {
      Meal.create(req.body)
      .then(meal => {
        res.redirect('/meals/new')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/error')
      })
    }
  })

}

export {
  newMeal as new,
  create
}