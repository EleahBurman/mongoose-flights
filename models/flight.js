import mongoose from "mongoose"

const Schema = mongoose.Schema

const oneYearLater = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear()+1)
  return date
}

const flightSchema = new Schema({
  airline: {type: String, enum: ['American', 'Southwest', 'United']},
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
  flightNo: {type: Number, required: (10 - 9999)},
  departs: {type: Date, default: oneYearLater}
})


const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}