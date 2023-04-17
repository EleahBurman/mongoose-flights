import mongoose from "mongoose"

const Schema = mongoose.Schema

const departs = function(){
  const currentDate = new Date(Date.now())
  const departDate = new Date()
  departDate.setFullYear(getFullYear() +1)
  return departDate
}

const flightSchema = new Schema({
  airline: {type: String, enum: ['American', 'Southwest', 'United']},
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
  flightNo: {type: Number, required: (10 - 9999)},
  departs: {type: Date, default: departs, timestamps: true}
})


const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}