

let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
        }
    },
  phone: String,
  homeAddress: String
})

module.exports = mongoose.model('Users', userSchema)