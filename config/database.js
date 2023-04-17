import mongoose from "mongoose"

const  Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {type: String, enum: ['American', 'Southwest', 'United']},
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN' ]},
  flightNo: {type: Number, req: 10-9999},
  departs: {type: Date}
})